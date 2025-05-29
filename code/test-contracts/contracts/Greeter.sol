// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Greeter {
  string private greeting;
  bool private greetingChanged;
  constructor(string memory _greeting) {
    greeting = _greeting;
    greetingChanged = false;
  }
  function greet() public view returns (string memory) {
    return greeting;
  }
  function setGreeting(string memory _greeting) public {
    require(bytes(_greeting).length > 0, 'Greeting must not be empty');
    greeting = _greeting;
    greetingChanged = true;
  }
  function isGreetingChanged() public view returns (bool) {
    return greetingChanged;
  }
}
