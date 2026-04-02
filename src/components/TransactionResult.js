import React from "react";

const TransactionResult = ({ txHash, onSendAnother }) => {
  const explorerUrl =
    "https://stellar.expert/explorer/testnet/tx/" + txHash;

  return (
    <div className="card text-center">
      <div className="success-icon">🎉</div>
      <h2>Payment Successful!</h2>
      <p className="success-msg">
        Your payment settled on Stellar Testnet in seconds.
      </p>

      <div className="tx-box">
        <p className="tx-label">Transaction Hash</p>
        <p className="tx-hash">{txHash}</p>
      </div>

      <div className="path-display">
        <span className="path-node">Sender</span>
        <span className="path-arrow"> → </span>
        <span className="path-node">Stellar Network</span>
        <span className="path-arrow"> → </span>
        <span className="path-node green">Recipient</span>
      </div>

      <a
        href={explorerUrl}
        target="_blank"
        rel="noreferrer"
        className="btn-explorer"
      >
        View on Stellar Explorer
      </a>

      <button className="btn-send" onClick={onSendAnother}>
        Send Another Payment
      </button>
    </div>
  );
};

export default TransactionResult;