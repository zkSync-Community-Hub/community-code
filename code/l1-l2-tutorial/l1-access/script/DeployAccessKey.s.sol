// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/src/Script.sol";
import "../src/AccessKey.sol";

/// @notice Deploys the AccessKey contract to L1
contract DeployAccessKey is Script {
    function run() external {
        vm.startBroadcast();

        AccessKey accessKey = new AccessKey();

        console2.log("AccessKey deployed at:", address(accessKey));

        vm.stopBroadcast();
    }
}
