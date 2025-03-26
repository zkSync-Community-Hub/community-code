// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import { IBridgehub, L2TransactionRequestDirect } from "@zksync-contracts/l1-contracts/bridgehub/IBridgehub.sol";

contract AccessKey {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function unlockVaultOnL2(
        uint256 chainId,
        address bridgeHubAddress,
        address vaultAddress,
        bytes memory data,
        uint256 gasLimit,
        uint256 gasPerPubdataByteLimit,
        uint256 cost
    ) external payable {
        require(msg.sender == owner, "Only owner can unlock");

        IBridgehub bridgeHub = IBridgehub(bridgeHubAddress);

        // Construct the L2 transaction request struct
        L2TransactionRequestDirect memory request = L2TransactionRequestDirect({
            chainId: chainId,
            mintValue: msg.value,
            l2Contract: vaultAddress,
            l2Value: 0,
            l2Calldata: data,
            l2GasLimit: gasLimit,
            l2GasPerPubdataByteLimit: gasPerPubdataByteLimit,
            factoryDeps: new bytes[](0),
            refundRecipient: msg.sender
        });

        // Make the cross-chain transaction call
        bridgeHub.requestL2TransactionDirect{ value: msg.value }(request);
    }
}
