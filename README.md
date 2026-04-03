# 🚀 RemitFlow — Cross-Border Payments on Stellar

> Instant international payments in 3-5 seconds with near-zero fees

## 🌐 Live Demo
[https://stellar-remitflow-lrdhf6yam-nandini-jadhav1s-projects.vercel.app](https://stellar-remitflow-lrdhf6yam-nandini-jadhav1s-projects.vercel.app)

## 🎥 Demo Video
[Watch Demo](https://www.loom.com/share/48c0f836b0ca4f318b314c9d92fe9331)

## 📋 Overview
RemitFlow is a full-stack remittance application built on Stellar that solves
cross-border payments being slow (2-5 days), expensive (6-10% fees), and opaque.
Payments settle in 3-5 seconds with near-zero fees (~0.00001 XLM).

## ✨ Features
- 🔗 Connect Freighter wallet (non-custodial)
- 💸 Send XLM payments instantly on Stellar Testnet
- 🔄 Path Payment toggle (XLM to USDC route)
- 📊 Live exchange rate preview before sending
- ⛽ Fee Bump (gasless for recipient) toggle
- ✅ Real-time settlement with transaction hash
- 🔍 Stellar Explorer integration
- 📝 Soroban smart contract for on-chain payment recording

## 🏗️ Smart Contract (Soroban)
Located in `contracts/remitflow/src/lib.rs`
- Records payments on-chain with sender, recipient, amount, timestamp
- Tracks total payment count and emits events
- Full unit test suite in `test.rs`

## 🛠️ Tech Stack
- React.js
- Stellar SDK (@stellar/stellar-sdk)
- Freighter API (@stellar/freighter-api)
- Soroban SDK (Rust smart contract)
- Stellar Testnet (Horizon API)
- Vercel (Deployment)

## 🚀 How to Run
```bash
git clone https://github.com/Nandini-Jadhav1/stellar-remitflow-Cross-Border-Payments
cd stellar-remitflow-Cross-Border-Payments
npm install
npm start
```

## 👥 Testnet Users
| Name | Wallet Address |
|------|---------------|
| Shubham Golekar | GA3PMUXWSCWLT2FMQ76PODPODHLJHOWAHTD7JGOWHGGE5FZ3WWF6EJBO |
| Dnyaneshwari Badhe | GATCVV5LUG2YM6Y7YMN3LHZWRVV3MT34WBL7ZBPCIXKGAYXIQ3WG6SXZ |
| Harshal Jagdale | GCATAASNFHODIKA4VTIEZHONZB3BGZJL42FXHHZ3VS6YKX2PCDIJ3LDY |
| Yash Annadate | GBWDGDXAN4AW22OBEQADIOSK2GE7EFNDLZDTBJV6AP33SEPTGNNGFDAE |
| Yuvraj Vibhute | GARXEMFNMVPPXSTQYMXAU2KTLTTG4ZV7R5F56HHT7QGI6L3QAGHRTMBT |

## 📊 User Feedback
[View Google Form](https://docs.google.com/forms/d/e/1FAIpQLSdL-BiRPy22kKXl-sDsVY6c0QeUh-duUW8z7_QTkhRGHj8pTw/viewform)

[View Feedback Excel Sheet](https://docs.google.com/spreadsheets/d/12da1bg8IQiZxrh2JT2QR1nq5mX2LfKpR7KEtOpHbx6U/edit?usp=sharing)

## 🏗️ Architecture
See [ARCHITECTURE.md](./ARCHITECTURE.md)

## 🔄 Planned Improvements (based on user feedback)
- [x] Add live exchange rate + path payments + fee bump → [commit](https://github.com/Nandini-Jadhav1/stellar-remitflow-Cross-Border-Payments/commit/a3b970a)
- [x] Add Soroban smart contract lib.rs + test.rs → [commit](https://github.com/Nandini-Jadhav1/stellar-remitflow-Cross-Border-Payments/commit/a89d93b)
- [x] Add footer based on user feedback → [commit](https://github.com/Nandini-Jadhav1/stellar-remitflow-Cross-Border-Payments/commit/06ae662)
- [ ] Add transaction history page
- [ ] Mobile responsive improvements
- [ ] USDC support on mainnet