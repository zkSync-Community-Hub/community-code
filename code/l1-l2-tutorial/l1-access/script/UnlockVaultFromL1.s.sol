// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/src/Script.sol";
import "forge-std/src/console.sol";
import "../src/AccessKey.sol";
import "@zksync-contracts/l1-contracts/bridgehub/IBridgehub.sol";

interface IVault {
    function unlock() external;
}

/// @title UnlockVaultFromL1
/// @notice This script unlocks the vault on L2 by sending a cross-chain message from L1
/// @dev The script uses the AccessKey contract to send the message to the BridgeHub
/// @dev Should not be used in production
contract UnlockVaultFromL1 is Script {
    function run() external {
        // Load env vars
        address accessKeyAddress = vm.envAddress("ACCESS_KEY_ADDRESS");
        address vaultAddress = vm.envAddress("VAULT_ADDRESS");
        address bridgeHubAddress = vm.envAddress("BRIDGE_HUB_ADDRESS");
        uint256 chainId = vm.envUint("L2_CHAIN_ID");
        uint256 gasLimit = vm.envOr("L2_GAS_LIMIT", uint256(350_000));
        uint256 gasPerPubdataByteLimit = vm.envOr("L2_PUBDATA_BYTE_LIMIT", uint256(800));

        vm.startBroadcast();

        // Encode the calldata for the L2 vault's unlock() function
        bytes memory unlockData = abi.encodeWithSelector(IVault.unlock.selector);
        
        // Get base cost from the BridgeHub contract
        IBridgehub bridge = IBridgehub(bridgeHubAddress);
        uint256 gasPrice = tx.gasprice;
        
        uint256 baseCost = bridge.l2TransactionBaseCost(
                chainId,
                gasPrice,
                gasLimit,
                gasPerPubdataByteLimit
        );

        // Call AccessKey to send the cross-chain message
        AccessKey(accessKeyAddress).unlockVaultOnL2{ value: baseCost }(
            chainId,
            bridgeHubAddress,
            vaultAddress,
            unlockData,
            gasLimit,
            gasPerPubdataByteLimit,
            baseCost
        );

        vm.stopBroadcast();
    }
}
