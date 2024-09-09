// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IAccount.sol";
import "@matterlabs/zksync-contracts/l2/system-contracts/libraries/TransactionHelper.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";
// Used for signature validation
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
// Access ZKsync system contracts for nonce validation via NONCE_HOLDER_SYSTEM_CONTRACT
import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";
// to call non-view function of system contracts
import "@matterlabs/zksync-contracts/l2/system-contracts/libraries/SystemContractsCaller.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Account is IAccount, IERC1271 {
    // to get transaction hash
    using TransactionHelper for Transaction;

    // state variable for account owner
    address public owner;

    // the secp256r1 public key of the owner
    bytes public r1Owner;

    bytes4 constant EIP1271_SUCCESS_RETURN_VALUE = 0x1626ba7e;

    // P256Verify precompile address
    address constant P256 = 0x0000000000000000000000000000000000000100;

    // maximum value for 's' in a secp256r1 signature
    bytes32 constant lowSmax =
        0x7fffffff800000007fffffffffffffffde737d56d38bcf4279dce5617e3192a8;

    modifier onlyBootloader() {
        require(
            msg.sender == BOOTLOADER_FORMAL_ADDRESS,
            "Only bootloader can call this method"
        );
        // Continue execution if called from the bootloader.
        _;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    function validateTransaction(
        bytes32,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable override onlyBootloader returns (bytes4 magic) {
        return _validateTransaction(_suggestedSignedHash, _transaction);
    }

    function _validateTransaction(
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) internal returns (bytes4 magic) {
        // Incrementing the nonce of the account.
        // Note, that reserved[0] by convention is currently equal to the nonce passed in the transaction
        SystemContractsCaller.systemCallWithPropagatedRevert(
            uint32(gasleft()),
            address(NONCE_HOLDER_SYSTEM_CONTRACT),
            0,
            abi.encodeCall(
                INonceHolder.incrementMinNonceIfEquals,
                (_transaction.nonce)
            )
        );

        bytes32 txHash;
        // While the suggested signed hash is usually provided, it is generally
        // not recommended to rely on it to be present, since in the future
        // there may be tx types with no suggested signed hash.
        if (_suggestedSignedHash == bytes32(0)) {
            txHash = _transaction.encodeHash();
        } else {
            txHash = _suggestedSignedHash;
        }

        // The fact there is are enough balance for the account
        // should be checked explicitly to prevent user paying for fee for a
        // transaction that wouldn't be included on Ethereum.
        uint256 totalRequiredBalance = _transaction.totalRequiredBalance();
        require(
            totalRequiredBalance <= address(this).balance,
            "Not enough balance for fee + value"
        );

        // ANCHOR: _validateTransaction
        if (
            isValidSignature(txHash, _transaction.signature) ==
            EIP1271_SUCCESS_RETURN_VALUE
        ) {
            magic = ACCOUNT_VALIDATION_SUCCESS_MAGIC;
        } else {
            bool valid = validateWebAuthnSignature(_transaction.signature, txHash);
            if(valid){
                magic = ACCOUNT_VALIDATION_SUCCESS_MAGIC;
            } else {
                magic = bytes4(0);
            }
        }
        // ANCHOR_END: _validateTransaction
    }

    function executeTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        _executeTransaction(_transaction);
    }

    function _executeTransaction(Transaction calldata _transaction) internal {
        address to = address(uint160(_transaction.to));
        uint128 value = Utils.safeCastToU128(_transaction.value);
        bytes memory data = _transaction.data;

        if (to == address(DEPLOYER_SYSTEM_CONTRACT)) {
            uint32 gas = Utils.safeCastToU32(gasleft());

            // Note, that the deployer contract can only be called
            // with a "systemCall" flag.
            SystemContractsCaller.systemCallWithPropagatedRevert(
                gas,
                to,
                value,
                data
            );
        } else {
            bool success;
            assembly {
                success := call(
                    gas(),
                    to,
                    value,
                    add(data, 0x20),
                    mload(data),
                    0,
                    0
                )
            }
            require(success);
        }
    }

    function executeTransactionFromOutside(
        Transaction calldata _transaction
    ) external payable {
        bytes4 magic = _validateTransaction(bytes32(0), _transaction);
        require(magic == ACCOUNT_VALIDATION_SUCCESS_MAGIC, "NOT VALIDATED");
        _executeTransaction(_transaction);
    }

    function isValidSignature(
        bytes32 _hash,
        bytes memory _signature
    ) public view override returns (bytes4 magic) {
        magic = EIP1271_SUCCESS_RETURN_VALUE;

        if (_signature.length != 65) {
            // Signature is invalid anyway, but we need to proceed with the signature verification as usual
            // in order for the fee estimation to work correctly
            _signature = new bytes(65);

            // Making sure that the signatures look like a valid ECDSA signature and are not rejected rightaway
            // while skipping the main verification process.
            _signature[64] = bytes1(uint8(27));
        }

        // extract ECDSA signature
        uint8 v;
        bytes32 r;
        bytes32 s;
        // Signature loading code
        // we jump 32 (0x20) as the first slot of bytes contains the length
        // we jump 65 (0x41) per signature
        // for v we load 32 bytes ending with v (the first 31 come from s) then apply a mask
        assembly {
            r := mload(add(_signature, 0x20))
            s := mload(add(_signature, 0x40))
            v := and(mload(add(_signature, 0x41)), 0xff)
        }

        if (v != 27 && v != 28) {
            magic = bytes4(0);
        }

        // EIP-2 still allows signature malleability for ecrecover(). Remove this possibility and make the signature
        // unique. Appendix F in the Ethereum Yellow paper (https://ethereum.github.io/yellowpaper/paper.pdf), defines
        // the valid range for s in (301): 0 < s < secp256k1n ÷ 2 + 1, and for v in (302): v ∈ {27, 28}. Most
        // signatures from current libraries generate a unique signature with an s-value in the lower half order.
        //
        // If your library generates malleable signatures, such as s-values in the upper range, calculate a new s-value
        // with 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141 - s1 and flip v from 27 to 28 or
        // vice versa. If your library also generates signatures with 0/1 for v instead 27/28, add 27 to v to accept
        // these malleable signatures as well.
        if (
            uint256(s) >
            0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0
        ) {
            magic = bytes4(0);
        }

        address recoveredAddress = ecrecover(_hash, v, r, s);

        // Note, that we should abstain from using the require here in order to allow for fee estimation to work
        if (recoveredAddress != owner) {
            magic = bytes4(0);
        }
        if(recoveredAddress == address(0)){
            magic = bytes4(0);
        }
    }

    function payForTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        bool success = _transaction.payToTheBootloader();
        require(success, "Failed to pay the fee to the operator");
    }

    function prepareForPaymaster(
        bytes32, // _txHash
        bytes32, // _suggestedSignedHash
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        _transaction.processPaymasterInput();
    }

     function _decodeWebauthnSignature(
        bytes memory webauthnSignature
    )
        private
        pure
        returns (
            bytes memory authenticatorData,
            bytes memory clientData,
            bytes32[2] memory rs,
            bytes32 signedMessage
        )
    {
        (authenticatorData, 
        clientData, 
        rs,
        signedMessage
        ) = abi.decode(
            webauthnSignature,
            (bytes, 
            bytes, 
            bytes32[2],
            bytes32
            )
        );
      
    }

    function validateWebAuthnSignature(
        // bytes32 challenge,
        bytes memory webauthnSignature,
        bytes32 txHash
    ) private view returns (bool valid) {
        if(r1Owner.length == 0){
            return false;
        }
        bytes32[2] memory pubKey = abi.decode(r1Owner, (bytes32[2]));
        valid = _validateWebAuthnSignature(txHash, webauthnSignature, pubKey);
    }


      function _validateWebAuthnSignature(
        // bytes32 challenge,
        bytes32 txHash,
        bytes memory webauthnSignature,
        bytes32[2] memory pubKey
    ) private view returns (bool valid) {
        (
            bytes memory authenticatorData,
            bytes memory clientData,
            bytes32[2] memory rs,
            bytes32 signedMessage
        ) = _decodeWebauthnSignature(webauthnSignature);

        // malleability check
        if (rs[1] > lowSmax) {
            return false;
        }

        // check if the signed message is the same as the transaction hash
        if(txHash != signedMessage){
            return false;
        }

        bytes32 clientDataHash = sha256(clientData);
        bytes32 message = sha256(
            bytes.concat(authenticatorData, clientDataHash)
        );

        valid = callVerifier(message, rs, pubKey);
    }

    function callVerifier(
        bytes32 hash,
        bytes32[2] memory rs,
        bytes32[2] memory pubKey
    ) internal view returns (bool) {
        /**
         * Prepare the input format
         * input[  0: 32] = signed data hash
         * input[ 32: 64] = signature r
         * input[ 64: 96] = signature s
         * input[ 96:128] = public key x
         * input[128:160] = public key y
         */
        bytes memory input = abi.encodePacked(
            hash,
            rs[0],
            rs[1],
            pubKey[0],
            pubKey[1]
        );

        (bool __, bytes memory output) = P256.staticcall(input);

        // the precompiled contract does not return a false value
        if (output.length == 0){
            return false;
        }

        return abi.decode(output, (bool));
    }

    // WARNING: This function is not safe. Anyone can call it and change the owner of the account.
    // It is only used for testing purposes
    function updateR1Owner(bytes memory _r1Owner) external {
        r1Owner = _r1Owner;
    }

    fallback() external {
        // fallback of default account shouldn't be called by bootloader under no circumstances
        assert(msg.sender != BOOTLOADER_FORMAL_ADDRESS);

        // If the contract is called directly, behave like an EOA
    }

    receive() external payable {
        // If the contract is called directly, behave like an EOA.
        // Note, that is okay if the bootloader sends funds with no calldata as it may be used for refunds/operator payments
    }
}



