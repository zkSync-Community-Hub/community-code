// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IAccount.sol";
import "@matterlabs/zksync-contracts/l2/system-contracts/libraries/TransactionHelper.sol";

import "@openzeppelin/contracts/interfaces/IERC1271.sol";


contract TwoUserMultisig is IAccount, IERC1271 {
    // to get transaction hash
    using TransactionHelper for Transaction;


    bytes4 constant EIP1271_SUCCESS_RETURN_VALUE = 0x1626ba7e;

    modifier onlyBootloader() {
        require(
            msg.sender == BOOTLOADER_FORMAL_ADDRESS,
            "Only bootloader can call this function"
        );
        // Continue execution if called from the bootloader.
        _;
    }


    function validateTransaction(
        bytes32,
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) external payable override onlyBootloader returns (bytes4 magic) {
        magic = _validateTransaction(_suggestedSignedHash, _transaction);
    }

    function _validateTransaction(
        bytes32 _suggestedSignedHash,
        Transaction calldata _transaction
    ) internal returns (bytes4 magic) {
        // TO BE IMPLEMENTED
    }

    function executeTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        _executeTransaction(_transaction);
    }

    function _executeTransaction(Transaction calldata _transaction) internal {
        // TO BE IMPLEMENTED
    }

    function executeTransactionFromOutside(Transaction calldata _transaction)
        external
        payable
    {
        bytes4 magic = _validateTransaction(bytes32(0), _transaction);
        require(magic == ACCOUNT_VALIDATION_SUCCESS_MAGIC, "NOT VALIDATED");

        _executeTransaction(_transaction);
    }

    function isValidSignature(bytes32 _hash, bytes memory _signature)
        public
        view
        override
        returns (bytes4 magic)
    {
        // TO BE IMPLEMENTED
    }

    function payForTransaction(
        bytes32,
        bytes32,
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        // TO BE IMPLEMENTED
    }

    function prepareForPaymaster(
        bytes32, // _txHash
        bytes32, // _suggestedSignedHash
        Transaction calldata _transaction
    ) external payable override onlyBootloader {
        // TO BE IMPLEMENTED
    }

    // This function verifies that the ECDSA signature is both in correct format and non-malleable
    function checkValidECDSASignatureFormat(bytes memory _signature) internal pure returns (bool) {
        if(_signature.length != 65) {
            return false;
        }

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
  if(v != 27 && v != 28) {
            return false;
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
        if(uint256(s) > 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0) {
            return false;
        }

        return true;
    }

    function extractECDSASignature(bytes memory _fullSignature) internal pure returns (bytes memory signature1, bytes memory signature2) {
        require(_fullSignature.length == 130, "Invalid length");

        signature1 = new bytes(65);
        signature2 = new bytes(65);

        // Copying the first signature. Note, that we need an offset of 0x20
        // since it is where the length of the `_fullSignature` is stored
        assembly {
            let r := mload(add(_fullSignature, 0x20))
   let s := mload(add(_fullSignature, 0x40))
   let v := and(mload(add(_fullSignature, 0x41)), 0xff)

            mstore(add(signature1, 0x20), r)
            mstore(add(signature1, 0x40), s)
            mstore8(add(signature1, 0x60), v)
        }

        // Copying the second signature.
        assembly {
            let r := mload(add(_fullSignature, 0x61))
            let s := mload(add(_fullSignature, 0x81))
            let v := and(mload(add(_fullSignature, 0x82)), 0xff)

            mstore(add(signature2, 0x20), r)
            mstore(add(signature2, 0x40), s)
            mstore8(add(signature2, 0x60), v)
        }
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
