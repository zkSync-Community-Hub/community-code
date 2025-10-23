//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.21;
import { IL1Messenger } from '@matterlabs/zksync-contracts/contracts/system-contracts/interfaces/IL1Messenger.sol';

contract Staking {
  address constant L2_TO_L1_MESSENGER_SYSTEM_CONTRACT_ADDR = 0x0000000000000000000000000000000000008008;
  IL1Messenger public L1Messenger = IL1Messenger(L2_TO_L1_MESSENGER_SYSTEM_CONTRACT_ADDR);

  struct Deposit {
    uint256 amount;
    bool madeFirstDeposit;
  }

  // mapping to address to deposit amount and timestamp
  mapping(address => Deposit) public deposits;

  function deposit() external payable {
    require(msg.value > 0, 'no amount deposited');
    Deposit memory lastDeposit = deposits[msg.sender];
    deposits[msg.sender].amount = lastDeposit.amount + msg.value;
    if (lastDeposit.madeFirstDeposit != true) {
      deposits[msg.sender].madeFirstDeposit = true;
      bytes memory message = abi.encode(msg.sender);
      L1Messenger.sendToL1(message);
    }
  }

  function withdraw() external {
    Deposit memory lastDeposit = deposits[msg.sender];
    require(lastDeposit.amount > 0, 'no amount deposited');
    deposits[msg.sender].amount = 0;
    (bool sent, ) = msg.sender.call{ value: lastDeposit.amount }('');
    require(sent, 'send failed');
  }
}
