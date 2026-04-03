import * as StellarSdk from "stellar-sdk";

export const CONTRACT_ID = "YOUR_CONTRACT_ID_AFTER_DEPLOYMENT";
export const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET;
export const HORIZON_URL = "https://horizon-testnet.stellar.org";

const server = new StellarSdk.SorobanRpc.Server(
  "https://soroban-testnet.stellar.org"
);

export async function recordPaymentOnChain(
  senderAddress: string,
  recipientAddress: string,
  amount: number,
  asset: string,
  txHash: string
): Promise<string> {
  try {
    const contract = new StellarSdk.Contract(CONTRACT_ID);
    const account = await server.getAccount(senderAddress);
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(
        contract.call(
          "record_payment",
          StellarSdk.Address.fromString(senderAddress).toScVal(),
          StellarSdk.Address.fromString(recipientAddress).toScVal(),
          StellarSdk.nativeToScVal(amount * 10000000, { type: "i128" }),
          StellarSdk.nativeToScVal(asset, { type: "string" }),
          StellarSdk.nativeToScVal(txHash, { type: "string" })
        )
      )
      .setTimeout(30)
      .build();
    const preparedTx = await server.prepareTransaction(transaction);
    return preparedTx.toXDR();
  } catch (e: any) {
    console.error("Contract call failed:", e.message);
    throw new Error(e.message);
  }
}

export async function getPaymentCount(): Promise<number> {
  try {
    const contract = new StellarSdk.Contract(CONTRACT_ID);
    const account = await server.getAccount(
      "GAAZI4TCR3TY5OJHCTJC2A4QSY6CJWJH5IAJTGKIN2ER7LBNVKOCCWN"
    );
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: NETWORK_PASSPHRASE,
    })
      .addOperation(contract.call("get_payment_count"))
      .setTimeout(30)
      .build();
    const result = await server.simulateTransaction(transaction);
    if ("error" in result) return 0;
    const scVal = (result as any).result?.retval;
    return scVal ? StellarSdk.scValToNative(scVal) : 0;
  } catch (e) {
    return 0;
  }
}