// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import { IBridgehub, L2TransactionRequestDirect } from '@matterlabs/zksync-contracts/contracts/l1-contracts/bridgehub/IBridgehub.sol';

contract Governance {
  address public governor;

  constructor() {
    governor = msg.sender;
  }

  function callZkSync(
    uint256 chainId,
    address bridgeHubAddress,
    address contractAddr,
    bytes memory data,
    uint256 gasLimit,
    uint256 gasPerPubdataByteLimit,
    uint256 cost
  ) external payable {
    require(msg.sender == governor, 'Only governor is allowed');

    IBridgehub zksyncBridgeHub = IBridgehub(bridgeHubAddress);
    L2TransactionRequestDirect memory requestInput = L2TransactionRequestDirect(
      chainId,
      cost,
      contractAddr,
      0,
      data,
      gasLimit,
      gasPerPubdataByteLimit,
      new bytes[](0),
      msg.sender
    );
    zksyncBridgeHub.requestL2TransactionDirect{ value: msg.value }(requestInput);
  }
}
