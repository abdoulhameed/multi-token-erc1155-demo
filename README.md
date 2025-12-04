# MultiToken ERC-1155 Demo

A professional ERC-1155 Multi-Token smart contract built with **Solidity** and **OpenZeppelin**.  
This project demonstrates multi-token minting, batch transfers, supply limits, and proper access control.

---

## 📌 Overview

This repository includes:

- `MultiToken.sol` — ERC-1155 smart contract with single and batch minting
- `deploy.js` — Hardhat deployment script
- `MultiToken.test.js` — Friendly unit tests covering minting, batch minting, and max supply enforcement
- Structured folder layout for professional blockchain development

This project is designed to **showcase professional blockchain development skills** and can be deployed to any EVM-compatible network.

---

## 📂 Project Structure

multi-token-erc1155-demo/ │ ├── contracts/ │   └── MultiToken.sol │ ├── scripts/ │   └── deploy.js │ ├── test/ │   └── MultiToken.test.js │ └── README.md

---

## 🛠 Tech Stack

- **Solidity** 0.8.x  
- **Hardhat** (development & testing)  
- **OpenZeppelin Contracts** (security-first implementation)  
- **Node.js** & npm  

---

## ⚙️ Setup Instructions

Clone the repository:

```bash
git clone https://github.com/abdoulhameed/multi-token-erc1155-demo.git
cd multi-token-erc1155-demo

Install dependencies:

npm install

Compile contracts:

npx hardhat compile


---

🚀 Deployment

Deploy locally:

npx hardhat run scripts/deploy.js --network localhost

Deploy to a testnet (e.g., Sepolia):

npx hardhat run scripts/deploy.js --network sepolia

> Ensure your hardhat.config.js has the RPC URL and private key for the testnet.




---


🔐 Security & Best Practices

Uses audited OpenZeppelin ERC-1155 standards

Enforces max supply limits

Implements ownership restrictions using Ownable

Clean, readable, and auditable contract code



---

👤 Author

Abdoulhameed Mustapha
Blockchain Developer
📧 Email: abdulhamidmustapha836@gmail.com
📞 Phone: +234 916 173 8186


---

📄 License

No license added. All rights reserved.
