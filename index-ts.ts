import {
  createWalletClient,
  custom,
  createPublicClient,
  parseEther,
  defineChain,
  formatEther,
  WalletClient,
  PublicClient,
  Chain,
  Address,
  Hex
} from "viem"
import "viem/window"
import { abi, contractAddress } from "./constants-ts"

// Type definitions for DOM elements
const connectButton = document.getElementById(
  "connectButton"
) as HTMLButtonElement
const fundButton = document.getElementById("fundButton") as HTMLButtonElement
const ethAmountInput = document.getElementById("ethAmount") as HTMLInputElement
const balanceButton = document.getElementById(
  "balanceButton"
) as HTMLButtonElement
const withdrawButton = document.getElementById(
  "withdrawButton"
) as HTMLButtonElement

console.log("Initializing wallet client...")

// Type definitions for wallet clients
let walletClient: WalletClient | undefined
let publicClient: PublicClient | undefined

async function connect(): Promise<void> {
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum)
    })
    await walletClient.requestAddresses()
    connectButton.innerHTML = "Connected!"
  } else {
    connectButton.innerText = "Please install MetaMask"
  }
}

async function fund(): Promise<void> {
  const ethAmount: string = ethAmountInput.value
  console.log(`Funding with ${ethAmount} ETH...`)

  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum)
    })
    const [connectedAccount]: Address[] = await walletClient.requestAddresses()
    const currentChain: Chain = await getCurrentChain(walletClient)

    publicClient = createPublicClient({
      transport: custom(window.ethereum)
    })
    console.log(parseEther(ethAmount))

    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi: abi,
      functionName: "fund",
      account: connectedAccount,
      chain: currentChain,
      value: parseEther(ethAmount)
    })
    const hash: Hex = await walletClient.writeContract(request)
    console.log(hash)
  } else {
    connectButton.innerText = "Please install MetaMask"
  }
}

async function withdraw(): Promise<void> {
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum)
    })
    const [connectedAccount]: Address[] = await walletClient.requestAddresses()
    const currentChain: Chain = await getCurrentChain(walletClient)
    publicClient = createPublicClient({
      transport: custom(window.ethereum)
    })

    const { request } = await publicClient.simulateContract({
      address: contractAddress,
      abi: abi,
      functionName: "withdraw",
      account: connectedAccount,
      chain: currentChain
    })

    const hash: Hex = await walletClient.writeContract(request)
    console.log(`Withdraw transaction hash: ${hash}`)
  } else {
    connectButton.innerText = "Please install MetaMask"
  }
}

async function getCurrentChain(client: WalletClient): Promise<Chain> {
  const chainId: number = await client.getChainId()
  const currentChain: Chain = defineChain({
    id: chainId,
    name: "Custom Chain",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: {
      default: {
        http: ["http://localhost:8545"]
      }
    }
  })
  return currentChain
}

async function getBalance(): Promise<void> {
  if (typeof window.ethereum !== "undefined") {
    publicClient = createPublicClient({
      transport: custom(window.ethereum)
    })
    const balance: bigint = await publicClient.getBalance({
      address: contractAddress
    })
    console.log(`Balance: ${formatEther(balance)} Ether`)
  }
}

withdrawButton.onclick = withdraw
balanceButton.onclick = getBalance
connectButton.onclick = connect
fundButton.onclick = fund
