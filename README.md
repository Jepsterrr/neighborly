# Neighborly - A Web3 Community Service Exchange

Neighborly is a decentralized Progressive Web App (PWA) designed to foster local communities by creating a trust-based marketplace for small services and favors. Instead of traditional currency, the platform operates on a local community token and a reputation system built on the blockchain.

## The Problem

In any local community, there's a vast amount of untapped value in small services (e.g., borrowing a power drill, getting help moving a sofa, watering plants). However, handling payments and establishing trust for these small-scale transactions can be a significant barrier, often preventing these exchanges from happening.

## The Solution

Neighborly provides a PWA where neighbors can offer and request services. The platform is built on Web3 principles to ensure transparency and trust:

* **Community Tokens (NLYT):** Instead of money, users earn and spend a local ERC20 token, `Neighborly Token (NLYT)`. Tokens are minted and awarded to the service provider only after the requester confirms the service is complete. This creates a circular economy based on mutual aid.
* **Reputation NFTs (NLYR):** Every completed service generates a non-fungible token (NFT) as a "receipt" and a testament to the user's positive contribution. These NFTs build a user's on-chain reputation.
* **Decentralized:** Built on the Polygon network (or any EVM-compatible chain), the platform removes the need for a central intermediary to handle payments or dictate rules.

## Core Features

* **Service Board:** A dashboard to view and accept open service requests from neighbors.
* **Request Creation:** Easily create new service requests with a description and a token reward.
* **Wallet Integration:** Securely connect with a MetaMask wallet to manage identity, tokens, and NFTs.
* **User Profiles:** A personal profile linked to your wallet address, with an editable display name.
* **On-Chain Transactions:** All core actions (requesting, accepting, confirming) are handled by smart contracts.

## Tech Stack

### Blockchain (Backend)
* **Solidity:** For writing smart contracts.
* **Hardhat:** For development, testing, and deployment of contracts.
* **OpenZeppelin:** For secure, standardized contract templates (ERC20, ERC721).
* **Polygon (Sepolia Testnet):** The EVM-compatible blockchain for low transaction fees.

### Frontend
* **React & Vite:** For a fast, modern, and component-based user interface.
* **TypeScript:** For type safety and improved code quality.
* **Ethers.js:** A robust library for interacting with the blockchain from the frontend.
* **React Router:** For creating a multi-page application experience.
* **CSS:** Modern styling with a clean, app-like layout.

### Decentralized Storage
* **IPFS:** Intended for storing the metadata (images, attributes) for the reputation NFTs.

## Project Structure

The project is a monorepo containing two main packages:

```
neighborly/
├── blockchain/   # Smart contracts and blockchain scripts (Hardhat, Solidity)
└── frontend/     # React-based web application (Vite, TypeScript)
```

- **blockchain/**: Contains all smart contract code, deployment scripts, and configuration for the Polygon (Sepolia) network.
- **frontend/**: Contains the source code for the Progressive Web App, including components, routes, and blockchain integration.

## 🏁 Getting Started

Follow these instructions to set up and run the project locally for development.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or later)
* [Git](https://git-scm.com/)
* [MetaMask](https://metamask.io/) browser extension

### 1. Backend Setup (`/blockchain`)

First, we need to deploy the smart contracts to a test network.

1.  **Navigate to the blockchain directory:**
    ```bash
    cd blockchain
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the `blockchain` directory. Copy the contents of `.env.example` if it exists, or use the template below.
    ```
    # blockchain/.env
    SEPOLIA_RPC_URL="YOUR_ALCHEMY_OR_INFURA_HTTPS_URL"
    SEPOLIA_PRIVATE_KEY="YOUR_METAMASK_ACCOUNT_PRIVATE_KEY"
    ```
    * `SEPOLIA_RPC_URL`: Get this from a node provider like [Alchemy](https://www.alchemy.com/) or [Infura](https://www.infura.io/).
    * `SEPOLIA_PRIVATE_KEY`: Your private key from a MetaMask account funded with Sepolia ETH from a [faucet](https://sepoliafaucet.com/).

4.  **Compile and Deploy the contracts:**
    ```bash
    npx hardhat run scripts/deploy.ts --network sepolia
    ```

5.  **Save the contract addresses!** After the script finishes, it will print the addresses of your deployed contracts. **Copy these addresses.** You will need them for the frontend.

### 2. Frontend Setup (`/frontend`)

Now, let's get the user interface running.

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env` in the `frontend` directory. Paste the contract addresses you copied from the backend deployment step.
    ```
    # frontend/.env
    VITE_SERVICE_EXCHANGE_ADDRESS="PASTE_YOUR_SERVICE_EXCHANGE_ADDRESS_HERE"
    VITE_NEIGHBORLY_TOKEN_ADDRESS="PASTE_YOUR_NEIGHBORLY_TOKEN_ADDRESS_HERE"
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Your browser should open to `http://localhost:5173` (or a similar address) with the Neighborly app running!

## Future Roadmap

This is a foundational version of Neighborly. Future improvements could include:

* **Dispute Resolution:** A mechanism to handle disagreements about service completion.
* **Direct Messaging:** Allow users to communicate securely within the app.
* **Enhanced User Profiles:** Display reputation NFT galleries and service history.
* **Real-time Notifications:** Inform users when their request is accepted or completed.
* **Decentralized Profile Data:** Move editable profile data from `localStorage` to a decentralized solution like [Ceramic Network](https://ceramic.network/) or IPFS.
