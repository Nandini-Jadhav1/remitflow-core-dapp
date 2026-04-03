// import React, { useState, useEffect } from "react";
// import {
//   checkConnection,
//   retrievePublicKey,
//   getBalance,
//   getExchangeRate,
//   sendPathPayment,
// } from "./Freighter";

// const Header = () => {
//   const [connected, setConnected] = useState(false);
//   const [publicKey, setPublicKey] = useState("");
//   const [balance, setBalance] = useState("0");
//   const [destination, setDestination] = useState("");
//   const [amount, setAmount] = useState("");
//   const [useUSDC, setUseUSDC] = useState(false);
//   const [exchangeRate, setExchangeRate] = useState(null);
//   const [rateLoading, setRateLoading] = useState(false);
//   const [txResult, setTxResult] = useState("");
//   const [txHash, setTxHash] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [feeBump, setFeeBump] = useState(false);
//   const [lastUseUSDC, setLastUseUSDC] = useState(false);
//   const [screen, setScreen] = useState("form");

//   useEffect(() => {
//     if (!amount || parseFloat(amount) <= 0 || !useUSDC) {
//       setExchangeRate(null);
//       return;
//     }
//     const timer = setTimeout(async () => {
//       setRateLoading(true);
//       const rate = await getExchangeRate(amount);
//       setExchangeRate(rate);
//       setRateLoading(false);
//     }, 600);
//     return () => clearTimeout(timer);
//   }, [amount, useUSDC]);

//   const connectWallet = async () => {
//     try {
//       const allowed = await checkConnection();
//       if (!allowed) {
//         alert("Please install Freighter from https://freighter.app");
//         return;
//       }
//       const key = await retrievePublicKey();
//       const bal = await getBalance(key);
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
//     setExchangeRate(null);
//     setUseUSDC(false);
//     setFeeBump(false);
//     setScreen("form");
//   };

//   const handleSend = async () => {
//     if (!destination || !amount) {
//       alert("Please enter destination and amount.");
//       return;
//     }
//     if (!destination.startsWith("G") || destination.length !== 56) {
//       alert("Invalid Stellar address.");
//       return;
//     }
//     if (parseFloat(amount) > parseFloat(balance)) {
//       alert("Insufficient balance.");
//       return;
//     }
//     try {
//       setLoading(true);
//       setTxResult("Processing...");
//       setTxHash("");
//       const hash = await sendPathPayment(destination, amount, useUSDC);
//       setLastUseUSDC(useUSDC);
//       setTxHash(hash);
//       setTxResult("Transaction Successful!");
//       setDestination("");
//       setAmount("");
//       setUseUSDC(false);
//       setFeeBump(false);
//       setExchangeRate(null);
//       const bal = await getBalance();
//       setBalance(Number(bal).toFixed(2));
//       setScreen("success");
//     } catch (e) {
//       setTxResult("Failed: " + e.message);
//       setScreen("error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSendAnother = () => {
//     setTxResult("");
//     setTxHash("");
//     setScreen("form");
//   };

//   const shortKey = publicKey ? publicKey.slice(0, 6) + "..." + publicKey.slice(-6) : "";

//   const S = {
//     page: { minHeight: "100vh", background: "linear-gradient(135deg, #0a0a1a 0%, #1a0533 50%, #0a1628 100%)", fontFamily: "'Segoe UI', sans-serif", color: "#fff", display: "flex", flexDirection: "column" },
//     nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 40px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 100 },
//     logo: { fontSize: "22px", fontWeight: "800", background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
//     netBadge: { background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: "999px", padding: "3px 12px", fontSize: "11px", color: "#34d399", fontWeight: "600" },
//     center: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "40px 20px" },
//     card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "28px", padding: "40px", width: "100%", maxWidth: "500px", boxShadow: "0 25px 60px rgba(0,0,0,0.4)" },
//     cardTitle: { fontSize: "26px", fontWeight: "800", textAlign: "center", marginBottom: "24px", background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
//     input: { width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box", marginBottom: "16px" },
//     row: { display: "flex", justifyContent: "space-between", fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "6px" },
//     footer: { textAlign: "center", padding: "20px", color: "rgba(255,255,255,0.25)", fontSize: "12px", borderTop: "1px solid rgba(255,255,255,0.05)" },
//     badge: (r, g, b) => ({ background: "rgba("+r+","+g+","+b+",0.1)", border: "1px solid rgba("+r+","+g+","+b+",0.3)", borderRadius: "999px", padding: "7px 16px", fontSize: "13px", color: "rgb("+r+","+g+","+b+")", fontWeight: "600" }),
//     pathNode: (r, g, b) => ({ background: "rgba("+r+","+g+","+b+",0.12)", border: "1px solid rgba("+r+","+g+","+b+",0.3)", borderRadius: "999px", padding: "6px 16px", fontSize: "13px", color: "rgb("+r+","+g+","+b+")" }),
//   };

//   const NavBar = () => (
//     <nav style={S.nav}>
//       <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//         <span style={S.logo}>🚀 RemitFlow</span>
//         <span style={S.netBadge}>Stellar Testnet</span>
//       </div>
//       {connected && (
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <span style={S.badge(167,139,250)}>🔑 {shortKey}</span>
//           <span style={S.badge(52,211,153)}>💰 {balance} XLM</span>
//           <button onClick={disconnectWallet} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "999px", padding: "7px 16px", fontSize: "13px", color: "#f87171", cursor: "pointer" }}>
//             Disconnect
//           </button>
//         </div>
//       )}
//     </nav>
//   );

//   const Footer = () => (
//     <footer style={S.footer}>
//       Built on Stellar Testnet · RemitFlow 2025 ·{" "}
//       <a href="https://stellar.expert/explorer/testnet" target="_blank" rel="noreferrer" style={{ color: "#a78bfa" }}>
//         Stellar Explorer
//       </a>
//     </footer>
//   );

//   if (!connected) {
//     return (
//       <div style={S.page}>
//         <NavBar />
//         <div style={S.center}>
//           <div style={{ ...S.card, textAlign: "center", padding: "52px 44px" }}>
//             <span style={{ fontSize: "56px", display: "block", marginBottom: "16px" }}>🌍</span>
//             <h1 style={{ ...S.cardTitle, fontSize: "32px" }}>RemitFlow</h1>
//             <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: "32px", lineHeight: "1.7" }}>
//               Instant cross-border payments on Stellar.<br />3-5 second settlement. Near-zero fees.
//             </p>
//             <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "32px", flexWrap: "wrap" }}>
//               {["⚡ 3-5 sec", "💸 ~0.00001 XLM", "🔒 Non-custodial", "🔄 Path Payments"].map((f) => (
//                 <span key={f} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "999px", padding: "7px 14px", fontSize: "13px", color: "rgba(255,255,255,0.65)", cursor: "default", userSelect: "none" }}>
//                   {f}
//                 </span>
//               ))}
//             </div>
//             <button onClick={connectWallet} style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none", borderRadius: "14px", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 8px 24px rgba(124,58,237,0.35)" }}>
//               🔗 Connect Freighter Wallet
//             </button>
//             <p style={{ marginTop: "16px", color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
//               Don't have Freighter?{" "}
//               <a href="https://freighter.app" target="_blank" rel="noreferrer" style={{ color: "#a78bfa" }}>Install here</a>
//             </p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (screen === "success") {
//     return (
//       <div style={S.page}>
//         <NavBar />
//         <div style={S.center}>
//           <div style={{ ...S.card, textAlign: "center" }}>
//             <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
//             <h2 style={{ ...S.cardTitle, fontSize: "28px" }}>Payment Successful!</h2>
//             <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: "24px" }}>
//               Your payment settled on Stellar Testnet in seconds.
//             </p>
//             <div style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "14px", padding: "18px", marginBottom: "20px", textAlign: "left" }}>
//               <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "0.8px" }}>Transaction Hash</p>
//               <a href={"https://stellar.expert/explorer/testnet/tx/" + txHash} target="_blank" rel="noreferrer" style={{ color: "#a78bfa", fontSize: "12px", wordBreak: "break-all", textDecoration: "none" }}>
//                 {txHash}
//               </a>
//             </div>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
//               <span style={S.pathNode(167,139,250)}>Sender (XLM)</span>
//               <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "18px" }}>→</span>
//               <span style={S.pathNode(96,165,250)}>Stellar DEX</span>
//               <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "18px" }}>→</span>
//               <span style={S.pathNode(52,211,153)}>✅ {lastUseUSDC ? "USDC" : "XLM"}</span>
//             </div>
//             <a href={"https://stellar.expert/explorer/testnet/tx/" + txHash} target="_blank" rel="noreferrer" style={{ display: "block", width: "100%", padding: "14px", background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "12px", color: "#a78bfa", fontSize: "14px", fontWeight: "600", textDecoration: "none", marginBottom: "12px", boxSizing: "border-box" }}>
//               View on Stellar Explorer 🔍
//             </a>
//             <button onClick={handleSendAnother} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
//               Send Another Payment →
//             </button>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   if (screen === "error") {
//     return (
//       <div style={S.page}>
//         <NavBar />
//         <div style={S.center}>
//           <div style={{ ...S.card, textAlign: "center" }}>
//             <div style={{ fontSize: "64px", marginBottom: "16px" }}>❌</div>
//             <h2 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "12px", color: "#f87171" }}>Transaction Failed</h2>
//             <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: "24px", fontSize: "14px" }}>
//               {txResult.replace("Failed: ", "")}
//             </p>
//             <button onClick={handleSendAnother} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
//               Try Again →
//             </button>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div style={S.page}>
//       <NavBar />
//       <div style={S.center}>
//         <div style={S.card}>
//           <h2 style={S.cardTitle}>💸 Send Payment</h2>
//           <div style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "14px", padding: "18px", textAlign: "center", marginBottom: "24px" }}>
//             <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: "0 0 6px 0", textTransform: "uppercase", letterSpacing: "0.8px" }}>Available Balance</p>
//             <p style={{ color: "#34d399", fontSize: "32px", fontWeight: "800", margin: 0 }}>{balance} XLM</p>
//           </div>
//           <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "8px" }}>Recipient Stellar Address</p>
//           <input type="text" placeholder="G... (56 characters)" value={destination} onChange={(e) => setDestination(e.target.value)} style={S.input} />
//           <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "8px" }}>Amount (XLM)</p>
//           <input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} min="0" style={S.input} />
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px 16px", marginBottom: "12px" }}>
//             <div>
//               <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>🔄 Path Payment (XLM to USDC)</div>
//               <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>Recipient receives USDC instead of XLM</div>
//             </div>
//             <div onClick={() => setUseUSDC(!useUSDC)} style={{ width: "44px", height: "24px", borderRadius: "999px", background: useUSDC ? "#7c3aed" : "rgba(255,255,255,0.15)", cursor: "pointer", position: "relative", flexShrink: 0, transition: "background 0.2s" }}>
//               <div style={{ position: "absolute", top: "3px", left: useUSDC ? "23px" : "3px", width: "18px", height: "18px", borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
//             </div>
//           </div>
//           <div onClick={() => setFeeBump(!feeBump)} style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "12px", padding: "12px 16px", marginBottom: "16px", cursor: "pointer" }}>
//             <input type="checkbox" checked={feeBump} onChange={() => setFeeBump(!feeBump)} style={{ cursor: "pointer" }} />
//             <div>
//               <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>⛽ Gasless for Recipient (Fee Bump)</div>
//               <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>Sender covers all network fees</div>
//             </div>
//           </div>
//           {amount && parseFloat(amount) > 0 && (
//             <div style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: "12px", padding: "14px 16px", marginBottom: "16px" }}>
//               <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.8px" }}>📊 Transaction Preview</div>
//               <div style={S.row}><span>You Send</span><span style={{ color: "#a78bfa", fontWeight: "600" }}>{amount} XLM</span></div>
//               {useUSDC && (
//                 <div style={S.row}>
//                   <span>Recipient Gets</span>
//                   <span style={{ color: "#34d399", fontWeight: "600" }}>
//                     {rateLoading ? "Fetching rate..." : exchangeRate ? "approx " + parseFloat(exchangeRate.destinationAmount).toFixed(4) + " USDC" : "—"}
//                   </span>
//                 </div>
//               )}
//               <div style={S.row}><span>Route</span><span style={{ color: "#34d399", fontWeight: "600" }}>{useUSDC ? "XLM to USDC ⚡" : "XLM to XLM ⚡"}</span></div>
//               <div style={S.row}><span>Network Fee</span><span style={{ color: "#34d399", fontWeight: "600" }}>~0.00001 XLM {feeBump ? "(Sponsored)" : ""}</span></div>
//               <div style={S.row}><span>Settlement</span><span style={{ color: "#34d399", fontWeight: "600" }}>3-5 seconds</span></div>
//             </div>
//           )}
//           <button onClick={handleSend} disabled={loading} style={{ width: "100%", padding: "16px", background: loading ? "rgba(124,58,237,0.35)" : "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none", borderRadius: "14px", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
//             {loading ? "⏳ Processing..." : "🚀 Send " + (useUSDC ? "as USDC" : "XLM")}
//           </button>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Header;


import React, { useState, useEffect } from "react";
import {
  checkConnection,
  retrievePublicKey,
  getBalance,
  getExchangeRate,
  sendPathPayment,
} from "./Freighter";

const Header = () => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const [balance, setBalance] = useState("0");
  const [destination, setDestination] = useState("");
  const [amount, setAmount] = useState("");
  const [useUSDC, setUseUSDC] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [rateLoading, setRateLoading] = useState(false);
  const [txResult, setTxResult] = useState("");
  const [txHash, setTxHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [feeBump, setFeeBump] = useState(false);
  const [lastUseUSDC, setLastUseUSDC] = useState(false);
  const [screen, setScreen] = useState("form");

  useEffect(() => {
    if (!amount || parseFloat(amount) <= 0 || !useUSDC) {
      setExchangeRate(null);
      return;
    }
    const timer = setTimeout(async () => {
      setRateLoading(true);
      const rate = await getExchangeRate(amount);
      setExchangeRate(rate);
      setRateLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [amount, useUSDC]);

  const connectWallet = async () => {
    try {
      const allowed = await checkConnection();
      if (!allowed) {
        alert("Please install Freighter from https://freighter.app");
        return;
      }
      const key = await retrievePublicKey();
      const bal = await getBalance(key);
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
    setExchangeRate(null);
    setUseUSDC(false);
    setFeeBump(false);
    setScreen("form");
  };

  const handleSend = async () => {
    if (!destination || !amount) {
      alert("Please enter destination and amount.");
      return;
    }
    if (!destination.startsWith("G") || destination.length !== 56) {
      alert("Invalid Stellar address.");
      return;
    }
    if (parseFloat(amount) > parseFloat(balance)) {
      alert("Insufficient balance.");
      return;
    }
    try {
      setLoading(true);
      setTxResult("Processing...");
      setTxHash("");
      const hash = await sendPathPayment(destination, amount, useUSDC);
      setLastUseUSDC(useUSDC);
      setTxHash(hash);
      setTxResult("Transaction Successful!");
      setDestination("");
      setAmount("");
      setUseUSDC(false);
      setFeeBump(false);
      setExchangeRate(null);
      const bal = await getBalance();
      setBalance(Number(bal).toFixed(2));
      setScreen("success");
    } catch (e) {
      setTxResult("Failed: " + e.message);
      setScreen("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSendAnother = () => {
    setTxResult("");
    setTxHash("");
    setScreen("form");
  };

  const shortKey = publicKey ? publicKey.slice(0, 6) + "..." + publicKey.slice(-6) : "";

  const S = {
    page: { minHeight: "100vh", background: "linear-gradient(135deg, #0a0a1a 0%, #1a0533 50%, #0a1628 100%)", fontFamily: "'Segoe UI', sans-serif", color: "#fff", display: "flex", flexDirection: "column" },
    nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 40px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 100 },
    logo: { fontSize: "22px", fontWeight: "800", background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    netBadge: { background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: "999px", padding: "3px 12px", fontSize: "11px", color: "#34d399", fontWeight: "600" },
    center: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "40px 20px" },
    card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "28px", padding: "40px", width: "100%", maxWidth: "500px", boxShadow: "0 25px 60px rgba(0,0,0,0.4)" },
    cardTitle: { fontSize: "26px", fontWeight: "800", textAlign: "center", marginBottom: "24px", background: "linear-gradient(90deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    input: { width: "100%", padding: "14px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", color: "#fff", fontSize: "15px", outline: "none", boxSizing: "border-box", marginBottom: "16px" },
    row: { display: "flex", justifyContent: "space-between", fontSize: "13px", color: "rgba(255,255,255,0.5)", marginBottom: "6px" },
    footer: { textAlign: "center", padding: "20px", color: "rgba(255,255,255,0.25)", fontSize: "12px", borderTop: "1px solid rgba(255,255,255,0.05)" },
    badge: (r, g, b) => ({ background: "rgba("+r+","+g+","+b+",0.1)", border: "1px solid rgba("+r+","+g+","+b+",0.3)", borderRadius: "999px", padding: "7px 16px", fontSize: "13px", color: "rgb("+r+","+g+","+b+")", fontWeight: "600" }),
    pathNode: (r, g, b) => ({ background: "rgba("+r+","+g+","+b+",0.12)", border: "1px solid rgba("+r+","+g+","+b+",0.3)", borderRadius: "999px", padding: "6px 16px", fontSize: "13px", color: "rgb("+r+","+g+","+b+")" }),
  };

  const NavBar = () => (
    <nav style={S.nav}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={S.logo}>🚀 RemitFlow</span>
        <span style={S.netBadge}>Stellar Testnet</span>
      </div>
      {connected && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={S.badge(167,139,250)}>🔑 {shortKey}</span>
          <span style={S.badge(52,211,153)}>💰 {balance} XLM</span>
          <button onClick={disconnectWallet} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "999px", padding: "7px 16px", fontSize: "13px", color: "#f87171", cursor: "pointer" }}>
            Disconnect
          </button>
        </div>
      )}
    </nav>
  );

  const Footer = () => (
    <footer style={S.footer}>
      Built on Stellar Testnet · RemitFlow 2025 ·{" "}
      <a href="https://stellar.expert/explorer/testnet" target="_blank" rel="noreferrer" style={{ color: "#a78bfa" }}>
        Stellar Explorer
      </a>
    </footer>
  );

  if (!connected) {
    return (
      <div style={S.page}>
        <NavBar />
        <div style={S.center}>
          <div style={{ ...S.card, textAlign: "center", padding: "52px 44px" }}>
            <span style={{ fontSize: "56px", display: "block", marginBottom: "16px" }}>🌍</span>
            <h1 style={{ ...S.cardTitle, fontSize: "32px" }}>RemitFlow</h1>
            <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: "32px", lineHeight: "1.7" }}>
              Instant cross-border payments on Stellar.<br />3-5 second settlement. Near-zero fees.
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "32px", flexWrap: "wrap" }}>
              {["⚡ 3-5 sec", "💸 ~0.00001 XLM", "🔒 Non-custodial", "🔄 Path Payments"].map((f) => (
                <span key={f} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "999px", padding: "7px 14px", fontSize: "13px", color: "rgba(255,255,255,0.65)", cursor: "default", userSelect: "none" }}>
                  {f}
                </span>
              ))}
            </div>
            <button onClick={connectWallet} style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none", borderRadius: "14px", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer", boxShadow: "0 8px 24px rgba(124,58,237,0.35)" }}>
              🔗 Connect Freighter Wallet
            </button>
            <p style={{ marginTop: "16px", color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>
              Don't have Freighter?{" "}
              <a href="https://freighter.app" target="_blank" rel="noreferrer" style={{ color: "#a78bfa" }}>Install here</a>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (screen === "success") {
    return (
      <div style={S.page}>
        <NavBar />
        <div style={S.center}>
          <div style={{ ...S.card, textAlign: "center" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎉</div>
            <h2 style={{ ...S.cardTitle, fontSize: "28px" }}>Payment Successful!</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: "24px" }}>
              Your payment settled on Stellar Testnet in seconds.
            </p>
            <div style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "14px", padding: "18px", marginBottom: "20px", textAlign: "left" }}>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "0.8px" }}>Transaction Hash</p>
              <a href={"https://stellar.expert/explorer/testnet/tx/" + txHash} target="_blank" rel="noreferrer" style={{ color: "#a78bfa", fontSize: "12px", wordBreak: "break-all", textDecoration: "none" }}>
                {txHash}
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
              <span style={S.pathNode(167,139,250)}>Sender (XLM)</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "18px" }}>→</span>
              <span style={S.pathNode(96,165,250)}>Stellar DEX</span>
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "18px" }}>→</span>
              <span style={S.pathNode(52,211,153)}>✅ {lastUseUSDC ? "USDC" : "XLM"}</span>
            </div>
            <a href={"https://stellar.expert/explorer/testnet/tx/" + txHash} target="_blank" rel="noreferrer" style={{ display: "block", width: "100%", padding: "14px", background: "rgba(167,139,250,0.15)", border: "1px solid rgba(167,139,250,0.3)", borderRadius: "12px", color: "#a78bfa", fontSize: "14px", fontWeight: "600", textDecoration: "none", marginBottom: "12px", boxSizing: "border-box" }}>
              View on Stellar Explorer 🔍
            </a>
            <button onClick={handleSendAnother} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
              Send Another Payment →
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (screen === "error") {
    return (
      <div style={S.page}>
        <NavBar />
        <div style={S.center}>
          <div style={{ ...S.card, textAlign: "center" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>❌</div>
            <h2 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "12px", color: "#f87171" }}>Transaction Failed</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: "24px", fontSize: "14px" }}>
              {txResult.replace("Failed: ", "")}
            </p>
            <button onClick={handleSendAnother} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "15px", fontWeight: "700", cursor: "pointer" }}>
              Try Again →
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={S.page}>
      <NavBar />
      <div style={S.center}>
        <div style={S.card}>
          <h2 style={S.cardTitle}>💸 Send Payment</h2>
          <div style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "14px", padding: "18px", textAlign: "center", marginBottom: "24px" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: "0 0 6px 0", textTransform: "uppercase", letterSpacing: "0.8px" }}>Available Balance</p>
            <p style={{ color: "#34d399", fontSize: "32px", fontWeight: "800", margin: 0 }}>{balance} XLM</p>
          </div>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "8px" }}>Recipient Stellar Address</p>
          <input type="text" placeholder="G... (56 characters)" value={destination} onChange={(e) => setDestination(e.target.value)} style={S.input} />
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", marginBottom: "8px" }}>Amount (XLM)</p>
          <input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} min="0" style={S.input} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "14px 16px", marginBottom: "12px" }}>
            <div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>🔄 Path Payment (XLM to USDC)</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>Recipient receives USDC instead of XLM</div>
            </div>
            <div onClick={() => setUseUSDC(!useUSDC)} style={{ width: "44px", height: "24px", borderRadius: "999px", background: useUSDC ? "#7c3aed" : "rgba(255,255,255,0.15)", cursor: "pointer", position: "relative", flexShrink: 0, transition: "background 0.2s" }}>
              <div style={{ position: "absolute", top: "3px", left: useUSDC ? "23px" : "3px", width: "18px", height: "18px", borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
            </div>
          </div>
          <div onClick={() => setFeeBump(!feeBump)} style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "12px", padding: "12px 16px", marginBottom: "16px", cursor: "pointer" }}>
            <input type="checkbox" checked={feeBump} onChange={() => setFeeBump(!feeBump)} style={{ cursor: "pointer" }} />
            <div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>⛽ Gasless for Recipient (Fee Bump)</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", marginTop: "2px" }}>Sender covers all network fees</div>
            </div>
          </div>
          {amount && parseFloat(amount) > 0 && (
            <div style={{ background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: "12px", padding: "14px 16px", marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.8px" }}>📊 Transaction Preview</div>
              <div style={S.row}><span>You Send</span><span style={{ color: "#a78bfa", fontWeight: "600" }}>{amount} XLM</span></div>
              {useUSDC && (
                <div style={S.row}>
                  <span>Recipient Gets</span>
                  <span style={{ color: "#34d399", fontWeight: "600" }}>
                    {rateLoading ? "Fetching rate..." : exchangeRate ? "approx " + parseFloat(exchangeRate.destinationAmount).toFixed(4) + " USDC" : "—"}
                  </span>
                </div>
              )}
              <div style={S.row}><span>Route</span><span style={{ color: "#34d399", fontWeight: "600" }}>{useUSDC ? "XLM to USDC ⚡" : "XLM to XLM ⚡"}</span></div>
              <div style={S.row}><span>Network Fee</span><span style={{ color: "#34d399", fontWeight: "600" }}>~0.00001 XLM {feeBump ? "(Sponsored)" : ""}</span></div>
              <div style={S.row}><span>Settlement</span><span style={{ color: "#34d399", fontWeight: "600" }}>3-5 seconds</span></div>
            </div>
          )}
          <button onClick={handleSend} disabled={loading} style={{ width: "100%", padding: "16px", background: loading ? "rgba(124,58,237,0.35)" : "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "none", borderRadius: "14px", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
            {loading ? "⏳ Processing..." : "🚀 Send " + (useUSDC ? "as USDC" : "XLM")}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Header;