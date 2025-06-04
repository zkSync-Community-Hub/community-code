<template>
  <div
    v-if="!mainLoading"
    id="app-main"
  >
    <h1>Greeter says: {{ greeting }} 👋</h1>
    <div class="title">
      This a simple dApp, which can choose fee token and interact with the <code>Greeter</code> smart contract.
      <p>
        The contract is deployed on the ZKsync testnet on
        <a
          :href="`https://sepolia.explorer.zksync.io/address/${GREETER_CONTRACT_ADDRESS}`"
          target="_blank"
          >{{ GREETER_CONTRACT_ADDRESS }}</a
        >
      </p>
    </div>
    <div class="main-box">
      <div>
        Select token:
        <select
          v-model="selectedTokenAddress"
          @change="changeToken"
        >
          <option
            v-for="token in tokens"
            :key="token.address"
            :value="token.address"
          >
            {{ token.symbol }}
          </option>
        </select>
      </div>
      <div
        v-if="selectedToken"
        class="balance"
      >
        <p>
          Balance: <span v-if="retrievingBalance">Loading...</span>
          <span v-else>{{ currentBalance }} {{ selectedToken.symbol }}</span>
        </p>
        <p>
          Expected fee: <span v-if="retrievingFee">Loading...</span>
          <span v-else>{{ currentFee }} {{ selectedToken.symbol }}</span>
          <button
            class="refresh-button"
            @click="updateFee"
          >
            Refresh
          </button>
        </p>
      </div>
      <div class="greeting-input">
        <input
          v-model="newGreeting"
          :disabled="!selectedToken || txStatus != 0"
          placeholder="Write new greeting here..."
          type="text"
        />

        <button
          class="change-button"
          :disabled="!selectedToken || txStatus != 0 || retrievingFee"
          @click="changeGreeting"
        >
          <span v-if="selectedToken && !txStatus">Change greeting</span>
          <span v-else-if="!selectedToken">Select token to pay fee first</span>
          <span v-else-if="txStatus === 1">Sending tx...</span>
          <span v-else-if="txStatus === 2">Waiting until tx is committed...</span>
          <span v-else-if="txStatus === 3">Updating the page...</span>
          <span v-else-if="retrievingFee">Updating the fee...</span>
        </button>
      </div>
    </div>
  </div>
  <div
    v-else
    id="app-start"
  >
    <div class="start-screen">
      <h1>Welcome to Greeter dApp!</h1>
      <button
        v-if="correctNetwork"
        @click="connectMetamask"
      >
        Connect Metamask
      </button>
      <button
        v-else
        @click="addZkSyncSepolia"
      >
        Switch to ZKsync Sepolia
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import GREETER_CONTRACT_ABI from '../../contracts/artifacts-zk/contracts/Greeter.sol/Greeter.json';
// ANCHOR: zksync-ethers-imports

import { Contract, BrowserProvider, Provider, utils, type types, Signer, type Wallet } from 'zksync-ethers';

// ANCHOR_END: zksync-ethers-imports
// ANCHOR: ethers-imports
import { formatUnits } from 'ethers';
// ANCHOR_END: ethers-imports

const GREETER_CONTRACT_ADDRESS = import.meta.env.VITE_GREETER_CONTRACT_ADDRESS ?? '';

interface Token {
  address: string;
  decimals: number;
  name: string;
  symbol: string;
}

const allowedTokens: Token[] = [
  {
    address: utils.L2_BASE_TOKEN_ADDRESS,
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  // uncomment below to allow ERC20 tokens
  // {
  //   address: '0x7E2026D8f35872923F5459BbEDDB809F6aCEfEB3',
  //   decimals: 18,
  //   name: 'Test Token (zkSync Sepolia)',
  //   symbol: 'TEST',
  // },
  // {
  //   address: '0xe1405bA6D206e978f739E2D9702CC8a0C712755A',
  //   decimals: 6,
  //   name: 'USD Coin (zkSync Sepolia)',
  //   symbol: 'USDC',
  // },
  // {
  //   address: '0x6Ff473f001877D553833B6e312C89b3c8fACa7Ac',
  //   decimals: 18,
  //   name: 'DAI (zkSync Sepolia)',
  //   symbol: 'DAI',
  // },
  // {
  //   address: import.meta.env.VITE_TEST_TOKEN_ADDRESS ?? '',
  //   decimals: 18,
  //   name: 'DefaultTokenName',
  //   symbol: 'DTN',
  // },
];

// reactive references
const correctNetwork = ref(false);
const tokens = ref(allowedTokens);
const newGreeting = ref('');
const greeting = ref('');
const mainLoading = ref(true);
const retrievingFee = ref(false);
const retrievingBalance = ref(false);
const currentBalance = ref('');
const currentFee = ref('');
const selectedTokenAddress = ref(null);
const selectedToken = ref<{
  l2Address: string;
  decimals: number;
  symbol: string;
} | null>(null);
// txStatus is a reactive variable that tracks the status of the transaction
// 0 stands for no status, i.e no tx has been sent
// 1 stands for tx is beeing submitted to the operator
// 2 stands for tx awaiting commit
// 3 stands for updating the balance and greeting on the page
const txStatus = ref(0);

let provider: Provider | null = null;
let signer: Wallet | Signer | null = null;
let contract: Contract | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let thisWindow: any = null;

const networkChainId = 300;

// Lifecycle hook
onMounted(async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thisWindow = window as any;
  const network = await thisWindow.ethereum?.request({
    method: 'net_version',
  });
  if (network !== null && network !== undefined && +network === networkChainId) {
    correctNetwork.value = true;
  }
});

// ANCHOR: initialize-provider-and-signer
const initializeProviderAndSigner = async () => {
  provider = new Provider('https://sepolia.era.zksync.dev');
  // Note that we still need to get the Metamask signer
  const browserProvider = new BrowserProvider(thisWindow.ethereum);
  signer = Signer.from(await browserProvider.getSigner(), networkChainId, provider);
  contract = new Contract(GREETER_CONTRACT_ADDRESS, GREETER_CONTRACT_ABI.abi, signer);
};
// ANCHOR_END: initialize-provider-and-signer

// ANCHOR: get-greeting
const getGreeting = async () => {
  // Smart contract calls work the same way as in `ethers`
  const greeting = await contract?.greet();
  return greeting;
};
// ANCHOR_END: get-greeting

// ANCHOR: get-fee
const getFee = async () => {
  // Getting the amount of gas (gas) needed for one transaction
  const feeInGas = await contract?.setGreeting.estimateGas(newGreeting.value);
  // Getting the gas price per one erg. For now, it is the same for all tokens.
  const gasPriceInUnits = await provider?.getGasPrice();

  // To display the number of tokens in the human-readable format, we need to format them,
  // e.g. if feeInGas*gasPriceInUnits returns 500000000000000000 wei of ETH, we want to display 0.5 ETH the user
  return formatUnits(feeInGas! * gasPriceInUnits!, selectedToken?.value?.decimals);
};
// ANCHOR_END: get-fee

// ANCHOR: get-balance
const getBalance = async () => {
  // Getting the balance for the signer in the selected token
  console.log(selectedToken?.value);
  const balanceInUnits = await signer?.getBalance(selectedToken?.value?.l2Address);
  // To display the number of tokens in the human-readable format, we need to format them,
  // e.g. if balanceInUnits returns 500000000000000000 wei of ETH, we want to display 0.5 ETH the user
  return formatUnits(balanceInUnits!, selectedToken?.value?.decimals);
};
// ANCHOR_END: get-balance

// ANCHOR: get-overrides
// ANCHOR: get-overrides-first-part
const getOverrides = async () => {
  const from = await signer?.getAddress();
  let overrides: types.TransactionLike = { from };
  if (selectedToken?.value?.l2Address != utils.L2_BASE_TOKEN_ADDRESS) {
    let testnetPaymaster = import.meta.env.VITE_TESTNET_PAYMASTER_ADDRESS;
    if (!testnetPaymaster) {
      testnetPaymaster = await provider!.getTestnetPaymasterAddress();
    }
    const gasPrice = await provider!.getGasPrice();

    // define paymaster parameters for gas estimation
    const paramsForFeeEstimation = utils.getPaymasterParams(testnetPaymaster!, {
      type: 'ApprovalBased',
      minimalAllowance: BigInt('1'),
      token: selectedToken.value!.l2Address,
      innerInput: new Uint8Array(),
    });

    // estimate gasLimit via paymaster
    const gasLimit = await contract!.setGreeting.estimateGas(newGreeting.value, {
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams: paramsForFeeEstimation,
      },
    });

    // fee calculated in ETH will be the same in
    // ERC20 token using the testnet paymaster
    const fee = gasPrice * gasLimit;
    // ANCHOR_END: get-overrides-first-part

    const paymasterParams = utils.getPaymasterParams(testnetPaymaster!, {
      type: 'ApprovalBased',
      token: selectedToken.value!.l2Address,
      // provide estimated fee as allowance
      minimalAllowance: fee,
      // empty bytes as testnet paymaster does not use innerInput
      innerInput: new Uint8Array(),
    });

    overrides = {
      ...overrides,
      maxFeePerGas: gasPrice,
      maxPriorityFeePerGas: BigInt(1),
      gasLimit,
      customData: {
        gasPerPubdata: utils.DEFAULT_GAS_PER_PUBDATA_LIMIT,
        paymasterParams,
      },
    };
  }

  return overrides;
};
// ANCHOR_END: get-overrides

// ANCHOR: change-greeting
const changeGreeting = async () => {
  txStatus.value = 1;
  try {
    const overrides = await getOverrides();
    const txHandle = await contract?.setGreeting(newGreeting.value, overrides);
    txStatus.value = 2;

    // Wait until the transaction is committed
    await txHandle.wait();
    txStatus.value = 3;

    // Update greeting
    greeting.value = await getGreeting();

    retrievingFee.value = true;
    retrievingBalance.value = true;
    // Update balance and fee
    currentBalance.value = await getBalance();
    currentFee.value = await getFee();
  } catch (e) {
    console.error(e);
    alert(e);
  }

  txStatus.value = 0;
  retrievingFee.value = false;
  retrievingBalance.value = false;
  newGreeting.value = '';
};
// ANCHOR_END: change-greeting

const updateFee = async () => {
  retrievingFee.value = true;
  getFee()
    .then((fee) => {
      currentFee.value = fee;
    })
    .catch((e) => console.log(e))
    .finally(() => {
      retrievingFee.value = false;
    });
};
const updateBalance = async () => {
  retrievingBalance.value = true;
  getBalance()
    .then((balance) => {
      currentBalance.value = balance;
    })
    .catch((e) => console.log(e))
    .finally(() => {
      retrievingBalance.value = false;
    });
};
const changeToken = async () => {
  retrievingFee.value = true;
  retrievingBalance.value = true;

  console.log('CHANGING TOKEN');

  const tokenAddress = tokens.value.filter((t) => t.address === selectedTokenAddress.value)[0];
  selectedToken.value = {
    l2Address: tokenAddress.address,
    decimals: tokenAddress.decimals,
    symbol: tokenAddress.symbol,
  };
  console.log('NEW SELECTED TOKEN', selectedToken.value);
  try {
    await updateFee();
    await updateBalance();
  } catch (e) {
    console.log(e);
  } finally {
    retrievingFee.value = false;
    retrievingBalance.value = false;
  }
};
const loadMainScreen = async () => {
  await initializeProviderAndSigner();

  if (!provider || !signer) {
    alert('Follow the tutorial to learn how to connect to Metamask!');
    return;
  }

  await getGreeting()
    .then((newGreeting) => (greeting.value = newGreeting))
    .catch((e: unknown) => console.error(e));

  mainLoading.value = false;
};
const addZkSyncSepolia = async () => {
  // add ZKsync testnet to Metamask
  await thisWindow.ethereum?.request({
    method: 'wallet_addEthereumChain',
    params: [
      {
        chainId: '0x12C',
        chainName: 'zkSync Sepolia testnet',
        rpcUrls: ['https://sepolia.era.zksync.dev'],
        blockExplorerUrls: ['https://sepolia.explorer.zksync.io/'],
        nativeCurrency: {
          name: 'ETH',
          symbol: 'ETH',
          decimals: 18,
        },
      },
    ],
  });
  window.location.reload();
};
const connectMetamask = async () => {
  await thisWindow.ethereum?.request({ method: 'eth_requestAccounts' }).catch((e: unknown) => console.error(e));

  loadMainScreen();
};
</script>

<style scoped>
input,
select {
  padding: 8px 3px;
  margin: 0 5px;
}
button {
  margin: 0 5px;
}
.title,
.main-box,
.greeting-input,
.balance {
  margin: 10px;
}

#app-main,
#app-start {
  display: flex;
  flex-direction: column;
  grid-column-end: span 2;
  text-align: center;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.main-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

.start-screen {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
