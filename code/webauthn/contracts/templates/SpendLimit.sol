// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SpendLimit {
  uint public ONE_DAY = 24 hours;

  modifier onlyAccount() {
    require(msg.sender == address(this), 'Only the account that inherits this contract can call this method.');
    _;
  }

  function setSpendingLimit(address _token, uint _amount) public onlyAccount {}

  function removeSpendingLimit(address _token) public onlyAccount {}

  function _isValidUpdate(address _token) internal view returns (bool) {}

  function _updateLimit(address _token, uint _limit, uint _available, uint _resetTime, bool _isEnabled) private {}

  function _checkSpendingLimit(address _token, uint _amount) internal {}
}
