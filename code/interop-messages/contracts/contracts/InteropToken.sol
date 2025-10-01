// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import { ERC20 } from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';
import { IMessageVerification } from '@matterlabs/zksync-contracts/contracts/l1-contracts/state-transition/chain-interfaces/IMessageVerification.sol';
import { L2Message } from '@matterlabs/zksync-contracts/contracts/l1-contracts/common/Messaging.sol';

contract InteropToken is ERC20, Ownable {
  // mapping of chain IDs to the approved staking contract address
  mapping(uint256 => address) public approvedStakingContracts;

  // mapping of addresses to if they have minted tokens or not
  mapping(address => bool) public addressesThatMinted;

  // mapping of chain IDs to number of adresses that have minted some tokens
  mapping(uint256 => uint256) public rewardsByChain;

  // the chain ID with the most rewards
  uint256 public winningChainId;
  address constant L2_MESSAGE_VERIFICATION_ADDRESS = 0x0000000000000000000000000000000000010009;

  IMessageVerification public l2MessageVerifier = IMessageVerification(L2_MESSAGE_VERIFICATION_ADDRESS);

  constructor(
    uint256[] memory _chainIds,
    address[] memory _stakingContracts
  ) ERC20('InteropToken', 'INTR') Ownable(msg.sender) {
    require(_chainIds.length == _stakingContracts.length, 'Length mismatch');
    for (uint256 i = 0; i < _chainIds.length; ++i) {
      require(_stakingContracts[i] != address(0), 'Zero address used');
      require(approvedStakingContracts[_chainIds[i]] == address(0), 'Staking contract address already set');
      approvedStakingContracts[_chainIds[i]] = _stakingContracts[i];
    }
  }

  function mint(
    uint256 _sourceChainId,
    uint256 _l1BatchNumber,
    uint256 _l2MessageIndex,
    L2Message calldata _l2MessageData,
    bytes32[] calldata _proof
  ) external {
    // token can only be minted once per address
    require(addressesThatMinted[msg.sender] == false, 'Token already minted');
    require(approvedStakingContracts[_sourceChainId] == _l2MessageData.sender, 'Message origin not approved');
    bool result = checkMessageProof(_sourceChainId, _l1BatchNumber, _l2MessageIndex, _l2MessageData, _proof);
    require(result == true, 'Message not verified');
    address sender = abi.decode(_l2MessageData.data, (address));
    require(sender == msg.sender, 'Message sender is not depositor');
    rewardsByChain[_sourceChainId]++;
    if (rewardsByChain[_sourceChainId] > rewardsByChain[winningChainId]) {
      winningChainId = _sourceChainId;
    }
    addressesThatMinted[msg.sender] = true;
    _mint(msg.sender, 1);
  }

  function checkMessageProof(
    uint256 _sourceChainId,
    uint256 _l1BatchNumber,
    uint256 _l2MessageIndex,
    L2Message calldata _l2MessageData,
    bytes32[] calldata _proof
  ) public view returns (bool) {
    bool result = l2MessageVerifier.proveL2MessageInclusionShared(
      _sourceChainId,
      _l1BatchNumber,
      _l2MessageIndex,
      _l2MessageData,
      _proof
    );
    return result;
  }
}
