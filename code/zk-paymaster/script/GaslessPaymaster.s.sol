// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {Script} from "forge-std/src/Script.sol";
import {ScriptExt} from "forge-zksync-std/src/ScriptExt.sol";
import {GaslessPaymaster} from "../src/GaslessPaymaster.sol";
import {Counter} from "../src/Counter.sol";

contract PaymasterScript is Script, ScriptExt {
  GaslessPaymaster public paymaster;
    Counter public counter;

    bytes private paymasterEncodedInput;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        paymaster = new GaslessPaymaster{salt: "1234"}(msg.sender);
        (bool success,) = address(paymaster).call{value: 1 ether}("");
        require(success, "Failed to fund Paymaster.");

        paymasterEncodedInput = abi.encodeWithSelector(bytes4(keccak256("general(bytes)")), bytes(""));
        vmExt.zkUsePaymaster(address(paymaster), paymasterEncodedInput);
        counter = new Counter{salt: "1234"}();
        vm.roll(1);

        vm.stopBroadcast();
    }
}
