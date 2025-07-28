import {
  type Config,
  type Account,
  type PreparedTransaction,
  type Transaction,
  type SendTransactionResult,
  type RpId,
  sendTransactionAsyncSigner,
  prepareSendTransaction,
} from 'react-native-zksync-sso';
import { Authenticator } from './authenticator';
export { type PreparedTransaction };

/**
 * Helper class for account operations like transaction preparation and sending
 */
export class AccountClient {
  private account: Account;
  private rpId: RpId;
  private config: Config;

  constructor(account: Account, rpId: RpId, config: Config) {
    this.account = account;
    this.rpId = rpId;
    this.config = config;
  }

  /**
   * Prepares a transaction for sending
   * @param transaction The transaction to prepare
   * @returns Prepared transaction with fee information
   */
  async prepareTransaction(transaction: Transaction): Promise<PreparedTransaction> {
    const tx: Transaction = {
      to: transaction.to,
      value: transaction.value,
      from: this.account.address,
      input: transaction.input ?? undefined,
    };
    const preparedTransaction = await prepareSendTransaction(tx, this.config);
    return preparedTransaction;
  }

  /**
   * Sends a transaction
   * @param transaction The transaction to send
   * @returns Transaction hash
   */
  async sendTransaction(transaction: Transaction): Promise<SendTransactionResult> {
    const authenticator = new Authenticator(this.rpId);
    const result = await sendTransactionAsyncSigner(transaction, authenticator, this.config);
    return result;
  }
}
