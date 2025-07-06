# Buy Me a Coffee DApp

## Author: AlesxanDer1102

A decentralized application (DApp) that allows users to fund a smart contract with ETH, similar to a "Buy Me a Coffee" platform. Built with TypeScript, Viem, and Ethereum blockchain integration.

## Features

- **Connect Wallet**: Connect your MetaMask wallet to interact with the DApp
- **Fund Contract**: Send ETH to the smart contract (buy a coffee)
- **Get Balance**: Check the current balance of the smart contract
- **Withdraw Funds**: Withdraw all funds from the contract (owner only)

## Tech Stack

- **Frontend**: HTML, TypeScript, Viem library, Vite
- **Blockchain**: Ethereum (local development with Anvil)
- **Wallet**: MetaMask integration
- **Smart Contract**: Solidity-based funding contract
- **Package Manager**: pnpm

## Project Structure

```
coffe/
├── index.html          # Main HTML file
├── index.js            # JavaScript version of the DApp
├── index-ts.ts         # TypeScript version of the DApp
├── constants.js        # Contract ABI and address (JS)
├── constants-ts.ts     # Contract ABI and address (TypeScript)
├── tsconfig.json       # TypeScript configuration
├── .prettierrc         # Code formatting configuration
└── README.md           # This file
```

## Prerequisites

- MetaMask browser extension
- Anvil (Foundry) for local blockchain
- pnpm package manager
- Node.js

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd coffe
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start local blockchain**

   ```bash
   # Using Anvil (Foundry)
   anvil
   ```

4. **Deploy your smart contract**

   - Deploy the FundMe contract to your local Anvil blockchain with
    ```bash
    anvil --load-state fundme-anvil.json --block-time 5
    ```

   - Update the contract address in `constants.js` and `constants-ts.ts`

5. **Start development server**

   ```bash
   pnpm vite
   ```

6. **Configure MetaMask**
   - Add your local network (http://localhost:8545)
   - Import test accounts from your local Anvil blockchain

## Usage

1. Open the DApp in your browser
2. Click "Connect Wallet" to connect your MetaMask
3. Enter an ETH amount and click "Buy a Coffee" to fund the contract
4. Use "Get Balance" to check the contract's current balance
5. Use "Withdraw" to withdraw all funds (if you're the contract owner)

## Smart Contract Functions

The DApp interacts with the following smart contract functions:

- `fund()`: Send ETH to the contract
- `withdraw()`: Withdraw all funds (owner only)
- `getBalance()`: Get the contract's ETH balance

## Development

### TypeScript Development

If you're working with the TypeScript version:

```bash
# Development server with hot reload
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Code Formatting

The project uses Prettier for code formatting with the following configuration:

- No trailing commas
- No semicolons
- Double quotes
- 2-space indentation

## Troubleshooting

- **MetaMask connection issues**: Ensure MetaMask is installed and connected to the correct network
- **Transaction failures**: Check that you have sufficient ETH and the contract is deployed correctly


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
