import * as nearAPI from "near-api-js";
import { WalletConnection as WC } from "near-api-js";

const { connect, keyStores, WalletConnection } = nearAPI;

export class NearConnectionServices {
  static connectWallet = async (): Promise<WC> => {
    const connectionConfig = {
      networkId: "testnet",
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      explorerUrl: "https://explorer.testnet.near.org",
    };
    // connect to NEAR
    const nearConnection = await connect(connectionConfig);
    // create wallet connection
    const wallet = new WalletConnection(nearConnection, "testapp");
    if (!wallet.isSignedIn()) wallet.requestSignIn({});
    return wallet;
  };
}
