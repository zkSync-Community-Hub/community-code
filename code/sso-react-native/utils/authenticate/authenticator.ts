import sdk, { type PasskeyAuthenticatorAsync, type RpId } from 'react-native-zksync-sso';
const { authenticateWithPasskey } = sdk.authenticate;

/**
 * Authenticator class that implements passkey-based authentication.
 * This class handles the signing of messages using platform-specific passkey authentication.
 */
export class Authenticator implements PasskeyAuthenticatorAsync {
  private rpId: RpId;

  /**
   * Creates a new Authenticator instance.
   * @param rpId - The relying party ID used for passkey authentication
   */
  constructor(rpId: RpId) {
    this.rpId = rpId;
  }

  /**
   * Signs a message using the platform's passkey authentication.
   * @param message - The message to sign as an ArrayBuffer
   * @returns A Promise that resolves to the signed message as an ArrayBuffer
   */
  async signMessage(message: ArrayBuffer): Promise<ArrayBuffer> {
    return await authenticateWithPasskey(message, this.rpId);
  }
}
