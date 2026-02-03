// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/src/Script.sol";
import "../src/Vault.sol";

contract DeployVault is Script {
    function run() external {
        // Replace the address below with the actual AccessKey address you copied after deploying it.
        address l1AccessKey = 0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35;

        // Apply L1-to-L2 aliasing
        address aliasedAccessKey = address(uint160(l1AccessKey) + uint160(0x1111000000000000000000000000000000001111));

        vm.startBroadcast();
        new Vault(aliasedAccessKey);
        vm.stopBroadcast();
    }
}
