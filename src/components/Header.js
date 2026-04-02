// import { useState } from "react";
// import { checkConnection, retrievePublicKey, getBalance } from "./Freighter";

// const Header = ({ walletData, onConnect, onDisconnect }) => {
//   const [loading, setLoading] = useState(false);

//   const connectWallet = async () => {
//   setLoading(true);
//   try {
//     const connected = await checkConnection();
//     if (!connected) {
//       alert(
//         "Freighter not found!\nPlease install it from https://freighter.app and refresh."
//       );
//       setLoading(false);
//       return;
//     }
//     const key = await retrievePublicKey();
//     if (!key) throw new Error("No public key returned");
//     const bal = await getBalance(key);
//     onConnect(key, bal);
//   } catch (e) {
//     alert("Failed to connect: " + e.message);
//   }
//   setLoading(false);
// };

//   return (
//     <header className="header">
//       <div className="header-left">
//         <span className="logo">🚀 RemitFlow</span>
//         <span className="network-badge">Stellar Testnet</span>
//       </div>
//       <div className="header-right">
//         {walletData.connected ? (
//           <div className="wallet-info">
//             <span className="balance">⭐ {walletData.balance} XLM</span>
//             <span className="address">
//               {walletData.publicKey.slice(0, 6)}...
//               {walletData.publicKey.slice(-4)}
//             </span>
//             <button className="btn-disconnect" onClick={onDisconnect}>
//               Disconnect
//             </button>
//           </div>
//         ) : (
//           <button
//             className="btn-connect"
//             onClick={connectWallet}
//             disabled={loading}
//           >
//             {loading ? "Connecting..." : "Connect Freighter"}
//           </button>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;




// import React, { useState } from "react";
// import { checkConnection, retrievePublicKey, getBalance, sendXLM } from "./Freighter";

// const Header = () => {
//   const [connected, setConnected] = useState(false);
//   const [publicKey, setPublicKey] = useState("");
//   const [balance, setBalance] = useState("0");
//   const [destination, setDestination] = useState("");
//   const [amount, setAmount] = useState("");
//   const [txResult, setTxResult] = useState("");
//   const [txHash, setTxHash] = useState("");
//   const [loading, setLoading] = useState(false);

//   const connectWallet = async () => {
//     try {
//       const allowed = await checkConnection();
//       if (!allowed) return alert("Please allow Freighter access.");
//       const key = await retrievePublicKey();
//       const bal = await getBalance();
//       setPublicKey(key);
//       setBalance(Number(bal).toFixed(2));
//       setConnected(true);
//     } catch (e) {
//       alert("Failed to connect: " + e.message);
//     }
//   };

//   const disconnectWallet = () => {
//     setConnected(false);
//     setPublicKey("");
//     setBalance("0");
//     setDestination("");
//     setAmount("");
//     setTxResult("");
//     setTxHash("");
//   };

//   const handleSend = async () => {
//     if (!destination || !amount) {
//       alert("Please enter destination and amount.");
//       return;
//     }
//     try {
//       setLoading(true);
//       setTxResult("Sending...");
//       setTxHash("");
//       const res = await sendXLM(destination, amount);
//       setTxResult("Transaction Successful!");
//       setTxHash(res.hash);
//       const bal = await getBalance();
//       setBalance(Number(bal).toFixed(2));
//     } catch (e) {
//       setTxResult("Transaction Failed: " + e.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const shortKey = publicKey ? publicKey.slice(0, 6) + "..." + publicKey.slice(-6) : "";

//   if (!connected) {
//     return (
//       <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", fontFamily: "Segoe UI, sans-serif", color: "#fff", display: "flex", flexDirection: "column" }}>
//         <nav style={{ padding: "16px 32px", background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
//           <h1 style={{ margin: 0, fontSize: "24px", color: "#a78bfa" }}>🌟 Stellar Pay</h1>
//         </nav>
//         <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
//           <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "40px", width: "100%", maxWidth: "480px", textAlign: "center" }}>
//             <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>Welcome to Stellar Pay</h2>
//             <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "32px" }}>Send XLM instantly on the Stellar Testnet</p>
//             <button onClick={connectWallet} style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, #7c3aed, #a78bfa)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
//               🔗 Connect Freighter Wallet
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", fontFamily: "Segoe UI, sans-serif", color: "#fff", display: "flex", flexDirection: "column" }}>
//       <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", background: "rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
//         <h1 style={{ margin: 0, fontSize: "24px", color: "#a78bfa" }}>🌟 Stellar Pay</h1>
//         <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//           <span style={{ background: "rgba(167,139,250,0.15)", border: "1px solid #a78bfa", borderRadius: "20px", padding: "6px 14px", fontSize: "13px", color: "#a78bfa" }}>
//             {"🔑 " + shortKey}
//           </span>
//           <span style={{ background: "rgba(52,211,153,0.15)", border: "1px solid #34d399", borderRadius: "20px", padding: "6px 14px", fontSize: "13px", color: "#34d399" }}>
//             {"💰 " + balance + " XLM"}
//           </span>
//           <button onClick={disconnectWallet} style={{ background: "rgba(239,68,68,0.15)", border: "1px solid #ef4444", borderRadius: "20px", padding: "6px 14px", fontSize: "13px", color: "#ef4444", cursor: "pointer" }}>
//             Disconnect
//           </button>
//         </div>
//       </nav>

//       <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
//         <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px", padding: "40px", width: "100%", maxWidth: "480px" }}>
//           <h2 style={{ fontSize: "28px", marginBottom: "16px", textAlign: "center" }}>Send XLM</h2>

//           <div style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: "12px", padding: "16px", textAlign: "center", marginBottom: "24px" }}>
//             <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", margin: "0 0 4px 0" }}>Available Balance</p>
//             <p style={{ color: "#34d399", fontSize: "32px", fontWeight: "bold", margin: "0" }}>{balance} XLM</p>
//           </div>

//           <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: "0 0 8px 0" }}>Destination Address</p>
//           <input
//             type="text"
//             placeholder="G... (Stellar address)"
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//             style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box", marginBottom: "16px" }}
//           />

//           <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: "0 0 8px 0" }}>Amount (XLM)</p>
//           <input
//             type="number"
//             placeholder="e.g. 10"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             min="0"
//             style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box", marginBottom: "16px" }}
//           />

//           <button
//             onClick={handleSend}
//             disabled={loading}
//             style={{ width: "100%", padding: "16px", background: loading ? "rgba(124,58,237,0.4)" : "linear-gradient(135deg, #7c3aed, #a78bfa)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "16px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer" }}
//           >
//             {loading ? "Processing..." : "🚀 Send XLM"}
//           </button>

//           {txResult !== "" && (
//             <div style={{ marginTop: "20px", borderRadius: "12px", padding: "16px", background: txResult.includes("Successful") ? "rgba(52,211,153,0.1)" : txResult.includes("Failed") ? "rgba(239,68,68,0.1)" : "rgba(167,139,250,0.1)", border: txResult.includes("Successful") ? "1px solid rgba(52,211,153,0.4)" : txResult.includes("Failed") ? "1px solid rgba(239,68,68,0.4)" : "1px solid rgba(167,139,250,0.4)" }}>
//               <p style={{ margin: "0 0 8px 0", fontWeight: "bold", fontSize: "15px" }}>{txResult}</p>
//               {txHash !== "" && (
//                 <div>
//                   <p style={{ margin: "0 0 4px 0", color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>Transaction Hash:</p>
//                   <a href={"https://stellar.expert/explorer/testnet/tx/" + txHash} target="_blank" rel="noreferrer" style={{ color: "#a78bfa", fontSize: "13px", wordBreak: "break-all", textDecoration: "none" }}>
//                     {txHash}
//                   </a>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;





import React, { useState } from "react";
import { checkConnection, retrievePublicKey, getBalance, sendXLM } from "./Freighter";

const Header = () => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState("0");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [txResult, setTxResult] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      const allowed = await checkConnection();
      if (!allowed) return alert("Please allow Freighter access.");
      const key = await retrievePublicKey();
      const bal = await getBalance();
      setPublicKey(key);
      setBalance(Number(bal).toFixed(2));
      setConnected(true);
    } catch (e) {
      alert("Failed to connect: " + e.message);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setPublicKey("");
    setBalance("0");
    setDestination("");
    setAmount("");
    setTxResult("");
    setTxHash("");
  };

  const handleSend = async () => {
    if (!destination || !amount) {
      alert("Please enter destination and amount.");
      return;
    }
    if (!destination.startsWith("G") || destination.length !== 56) {
      alert("❌ Invalid Stellar address. Must start with G and be 56 characters.");
      return;
    }
    if (parseFloat(amount) > parseFloat(balance)) {
      alert("❌ Insufficient balance.");
      return;
    }
    try {
      setLoading(true);
      setTxResult("Sending...");
      setTxHash("");
      const res = await sendXLM(destination, amount);
      setTxResult("✅ Transaction Successful!");
      setTxHash(res.hash);
      const bal = await getBalance();
      setBalance(Number(bal).toFixed(2));
    } catch (e) {
      setTxResult("❌ Transaction Failed: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const shortKey = publicKey
    ? publicKey.slice(0, 6) + "..." + publicKey.slice(-6)
    : "";

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a1a 0%, #1a0533 50%, #0a1628 100%)",
      fontFamily: "'Segoe UI', sans-serif",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
    },
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "18px 40px",
      background: "rgba(255,255,255,0.03)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      backdropFilter: "blur(10px)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    },
    navLeft: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    logo: {
      fontSize: "22px",
      fontWeight: "800",
      background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      letterSpacing: "-0.5px",
    },
    networkBadge: {
      background: "rgba(52,211,153,0.1)",
      border: "1px solid rgba(52,211,153,0.3)",
      borderRadius: "999px",
      padding: "3px 12px",
      fontSize: "11px",
      color: "#34d399",
      fontWeight: "600",
      letterSpacing: "0.5px",
    },
    navRight: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    keyBadge: {
      background: "rgba(167,139,250,0.1)",
      border: "1px solid rgba(167,139,250,0.3)",
      borderRadius: "999px",
      padding: "7px 16px",
      fontSize: "13px",
      color: "#a78bfa",
      fontWeight: "500",
    },
    balanceBadge: {
      background: "rgba(52,211,153,0.1)",
      border: "1px solid rgba(52,211,153,0.3)",
      borderRadius: "999px",
      padding: "7px 16px",
      fontSize: "13px",
      color: "#34d399",
      fontWeight: "600",
    },
    disconnectBtn: {
      background: "rgba(239,68,68,0.1)",
      border: "1px solid rgba(239,68,68,0.3)",
      borderRadius: "999px",
      padding: "7px 16px",
      fontSize: "13px",
      color: "#f87171",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.2s",
    },
    centerArea: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px",
    },

    // ── Landing card ──
    landingCard: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "28px",
      padding: "52px 44px",
      width: "100%",
      maxWidth: "500px",
      textAlign: "center",
      boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
    },
    heroIcon: {
      fontSize: "56px",
      marginBottom: "16px",
      display: "block",
    },
    heroTitle: {
      fontSize: "32px",
      fontWeight: "800",
      marginBottom: "10px",
      background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    heroSub: {
      color: "rgba(255,255,255,0.45)",
      fontSize: "15px",
      marginBottom: "36px",
      lineHeight: "1.6",
    },
    featureRow: {
      display: "flex",
      gap: "10px",
      justifyContent: "center",
      marginBottom: "36px",
      flexWrap: "wrap",
    },
    featureChip: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "999px",
      padding: "8px 16px",
      fontSize: "13px",
      color: "rgba(255,255,255,0.7)",
    },
    connectBtn: {
      width: "100%",
      padding: "16px",
      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
      border: "none",
      borderRadius: "14px",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
      letterSpacing: "0.3px",
      boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
      transition: "transform 0.15s, box-shadow 0.15s",
    },
    hint: {
      marginTop: "16px",
      color: "rgba(255,255,255,0.3)",
      fontSize: "12px",
    },

    // ── Send card ──
    sendCard: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "28px",
      padding: "40px",
      width: "100%",
      maxWidth: "500px",
      boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
    },
    cardTitle: {
      fontSize: "26px",
      fontWeight: "800",
      textAlign: "center",
      marginBottom: "24px",
      background: "linear-gradient(90deg, #a78bfa, #60a5fa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    balanceBox: {
      background: "rgba(52,211,153,0.07)",
      border: "1px solid rgba(52,211,153,0.2)",
      borderRadius: "14px",
      padding: "18px",
      textAlign: "center",
      marginBottom: "28px",
    },
    balanceLabel: {
      color: "rgba(255,255,255,0.4)",
      fontSize: "12px",
      marginBottom: "6px",
      letterSpacing: "0.8px",
      textTransform: "uppercase",
    },
    balanceValue: {
      color: "#34d399",
      fontSize: "34px",
      fontWeight: "800",
      margin: 0,
    },
    fieldLabel: {
      color: "rgba(255,255,255,0.55)",
      fontSize: "13px",
      marginBottom: "8px",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "14px 16px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "12px",
      color: "#fff",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
      marginBottom: "18px",
      transition: "border 0.2s",
    },
    feeBox: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "12px",
      padding: "14px 16px",
      marginBottom: "20px",
    },
    feeRow: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "13px",
      color: "rgba(255,255,255,0.45)",
      marginBottom: "6px",
    },
    feeVal: { color: "#a78bfa", fontWeight: "600" },
    sendBtn: {
      width: "100%",
      padding: "16px",
      border: "none",
      borderRadius: "14px",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
      letterSpacing: "0.3px",
      boxShadow: "0 8px 24px rgba(124,58,237,0.35)",
      transition: "opacity 0.2s",
    },
    resultBox: (success) => ({
      marginTop: "20px",
      borderRadius: "14px",
      padding: "18px",
      background: success
        ? "rgba(52,211,153,0.07)"
        : "rgba(239,68,68,0.07)",
      border: `1px solid ${success ? "rgba(52,211,153,0.25)" : "rgba(239,68,68,0.25)"}`,
    }),
    resultTitle: { margin: "0 0 10px 0", fontWeight: "700", fontSize: "15px" },
    txLabel: {
      margin: "0 0 6px 0",
      color: "rgba(255,255,255,0.4)",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
    },
    txLink: {
      color: "#a78bfa",
      fontSize: "12px",
      wordBreak: "break-all",
      textDecoration: "none",
      lineHeight: "1.6",
    },
    pathRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      marginTop: "14px",
      flexWrap: "wrap",
    },
    pathNode: {
      background: "rgba(167,139,250,0.12)",
      border: "1px solid rgba(167,139,250,0.25)",
      borderRadius: "999px",
      padding: "5px 14px",
      fontSize: "12px",
      color: "#a78bfa",
    },
    pathArrow: { color: "rgba(255,255,255,0.25)", fontSize: "16px" },
  };

  const isSuccess = txResult.includes("Successful");

  // ── NOT CONNECTED ──
  if (!connected) {
    return (
      <div style={styles.page}>
        <nav style={styles.nav}>
          <div style={styles.navLeft}>
            <span style={styles.logo}>🚀 RemitFlow</span>
            <span style={styles.networkBadge}>Stellar Testnet</span>
          </div>
        </nav>
        <div style={styles.centerArea}>
          <div style={styles.landingCard}>
            <span style={styles.heroIcon}>🌍</span>
            <h1 style={styles.heroTitle}>RemitFlow</h1>
            <p style={styles.heroSub}>
              Instant cross-border payments on Stellar.<br />
              3–5 second settlement. Near-zero fees.
            </p>
            <div style={styles.featureRow}>
              <span style={styles.featureChip}>⚡ 3–5 sec settlement</span>
              <span style={styles.featureChip}>💸 ~0.00001 XLM fee</span>
              <span style={styles.featureChip}>🔒 Non-custodial</span>
            </div>
            <button style={styles.connectBtn} onClick={connectWallet}>
              🔗 Connect Freighter Wallet
            </button>
            <p style={styles.hint}>
              Don't have Freighter?{" "}
              <a
                href="https://freighter.app"
                target="_blank"
                rel="noreferrer"
                style={{ color: "#a78bfa" }}
              >
                Install here
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── CONNECTED ──
  return (
    <div style={styles.page}>
      <nav style={styles.nav}>
        <div style={styles.navLeft}>
          <span style={styles.logo}>🚀 RemitFlow</span>
          <span style={styles.networkBadge}>Stellar Testnet</span>
        </div>
        <div style={styles.navRight}>
          <span style={styles.keyBadge}>🔑 {shortKey}</span>
          <span style={styles.balanceBadge}>💰 {balance} XLM</span>
          <button style={styles.disconnectBtn} onClick={disconnectWallet}>
            Disconnect
          </button>
        </div>
      </nav>

      <div style={styles.centerArea}>
        <div style={styles.sendCard}>
          <h2 style={styles.cardTitle}>💸 Send XLM</h2>

          <div style={styles.balanceBox}>
            <p style={styles.balanceLabel}>Available Balance</p>
            <p style={styles.balanceValue}>{balance} XLM</p>
          </div>

          <p style={styles.fieldLabel}>Recipient Stellar Address</p>
          <input
            type="text"
            placeholder="G... (56 characters)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={styles.input}
          />

          <p style={styles.fieldLabel}>Amount (XLM)</p>
          <input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            style={styles.input}
          />

          {amount && parseFloat(amount) > 0 && (
            <div style={styles.feeBox}>
              <div style={styles.feeRow}>
                <span>Amount</span>
                <span style={styles.feeVal}>{amount} XLM</span>
              </div>
              <div style={styles.feeRow}>
                <span>Network Fee</span>
                <span style={{ color: "#34d399", fontWeight: 600 }}>
                  ~0.00001 XLM
                </span>
              </div>
              <div style={styles.feeRow}>
                <span>Settlement Time</span>
                <span style={{ color: "#34d399", fontWeight: 600 }}>
                  3–5 seconds
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleSend}
            disabled={loading}
            style={{
              ...styles.sendBtn,
              background: loading
                ? "rgba(124,58,237,0.35)"
                : "linear-gradient(135deg, #7c3aed, #4f46e5)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "⏳ Processing..." : "🚀 Send Payment"}
          </button>

          {txResult !== "" && (
            <div style={styles.resultBox(isSuccess)}>
              <p style={styles.resultTitle}>{txResult}</p>
              {txHash !== "" && (
                <>
                  <p style={styles.txLabel}>Transaction Hash</p>
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                    target="_blank"
                    rel="noreferrer"
                    style={styles.txLink}
                  >
                    {txHash}
                  </a>
                  <div style={styles.pathRow}>
                    <span style={styles.pathNode}>Sender</span>
                    <span style={styles.pathArrow}>→</span>
                    <span style={styles.pathNode}>Stellar Network</span>
                    <span style={styles.pathArrow}>→</span>
                    <span style={{ ...styles.pathNode, color: "#34d399", borderColor: "rgba(52,211,153,0.3)", background: "rgba(52,211,153,0.1)" }}>
                      ✅ Recipient
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;