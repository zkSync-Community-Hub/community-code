// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Vault {
    address public accessKey;
    bool public isUnlocked;

    constructor(address _accessKey) {
        accessKey = _accessKey;
        isUnlocked = false;
    }

    function unlock() public {
        require(msg.sender == accessKey, "Unauthorized caller");
        isUnlocked = true;
    }
}
