import { useState } from "react";
import Header from "./components/Header";
import SendPayment from "./components/SendPayment";
import TransactionResult from "./components/TransactionResult";
import "./App.css";

function App() {
  const [walletData, setWalletData] = useState({
    connected: false,
    publicKey: "",
    balance: "0",
  });
  const [txHash, setTxHash] = useState("");
  const [screen, setScreen] = useState("home"); // home | result

  function handleWalletConnect(publicKey, balance) {
    setWalletData({ connected: true, publicKey, balance });
  }

  function handleWalletDisconnect() {
    setWalletData({ connected: false, publicKey: "", balance: "0" });
    setScreen("home");
    setTxHash("");
  }

  function handleTxSuccess(hash) {
    setTxHash(hash);
    setScreen("result");
  }

  function handleSendAnother() {
    setTxHash("");
    setScreen("home");
  }

  return (
    <div className="app">
      <Header
        walletData={walletData}
        onConnect={handleWalletConnect}
        onDisconnect={handleWalletDisconnect}
      />
      <main className="main-content">
        {!walletData.connected && (
          <div className="hero">
            <h1>🚀 RemitFlow</h1>
            <p>Instant Cross-Border Payments on Stellar</p>
            <div className="features">
              <div className="feature-card">⚡ 3-5 sec settlement</div>
              <div className="feature-card">💸 Near-zero fees</div>
              <div className="feature-card">🔒 Non-custodial</div>
            </div>
            <p className="connect-hint">
              Connect your Freighter wallet to start sending
            </p>
          </div>
        )}

        {walletData.connected && screen === "home" && (
          <SendPayment
            sender={walletData.publicKey}
            balance={walletData.balance}
            onSuccess={handleTxSuccess}
          />
        )}

        {walletData.connected && screen === "result" && (
          <TransactionResult
            txHash={txHash}
            onSendAnother={handleSendAnother}
          />
        )}
      </main>
    </div>
  );
}

export default App;