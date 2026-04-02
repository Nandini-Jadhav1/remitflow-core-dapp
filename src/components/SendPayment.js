import React, { useState } from "react";
import { sendXLM } from "./Freighter";

const SendPayment = ({ sender, balance, onSuccess }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async () => {
    setError("");
    if (!recipient.startsWith("G") || recipient.length !== 56) {
      setError("Invalid Stellar address. Must start with G, 56 characters.");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (parseFloat(amount) > parseFloat(balance)) {
      setError("Insufficient balance.");
      return;
    }
    setLoading(true);
    try {
      const hash = await sendXLM(sender, recipient, amount);
      onSuccess(hash);
    } catch (e) {
      setError("Transaction failed: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Send XLM</h2>
      <div className="balance-display">
        <span>Available Balance</span>
        <strong>{balance} XLM</strong>
      </div>

      <div className="form-group">
        <label>Recipient Stellar Address</label>
        <input
          type="text"
          placeholder="G... (56 characters)"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="input"
        />
      </div>

      <div className="form-group">
        <label>Amount (XLM)</label>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
          min="0"
          step="0.01"
        />
      </div>

      {amount && parseFloat(amount) > 0 && (
        <div className="fee-preview">
          <div className="fee-row">
            <span>Amount</span>
            <span>{amount} XLM</span>
          </div>
          <div className="fee-row">
            <span>Network Fee</span>
            <span className="green">~0.00001 XLM</span>
          </div>
          <div className="fee-row">
            <span>Settlement</span>
            <span className="green">3-5 seconds</span>
          </div>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      <button
        className="btn-send"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? "Sending..." : "Send Payment"}
      </button>
    </div>
  );
};

export default SendPayment;