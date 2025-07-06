import {
  createWalletClient,
  custom,
  createPublicClient,
  parseEther,
  defineChain,
  formatEther
} from "https://esm.sh/viem"
import { abi, contractAddress } from "./constants.js"

const connectButton = document.getElementById("connectButton")
const fundButton = document.getElementById("fundButton")
const ethAmountInput = document.getElementById("ethAmount")
const balanceButton = document.getElementById("balanceButton")
const withdrawButton = document.getElementById("withdrawButton")

let walletClient
let publicClient

async function connect() {
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

async function fund() {
  const ethAmount = ethAmountInput.value
  console.log(`Funding with ${ethAmount} ETH...`)
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum)
    })
    const [connectedAccount] = await walletClient.requestAddresses()
    const currentChain = await getCurrentChain(walletClient)

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
    const hash = await walletClient.writeContract(request)
    console.log(hash)
  } else {
    connectButton.innerText = "Please install MetaMask"
  }
}

async function withdraw() {
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum)
    })
    const [connectedAccount] = await walletClient.requestAddresses()
    const currentChain = await getCurrentChain(walletClient)
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

    const hash = await walletClient.writeContract(request)
    console.log(`Withdraw transaction hash: ${hash}`)
  } else {
    connectButton.innerText = "Please install MetaMask"
  }
}

async function getCurrentChain(client) {
  const chainId = await client.getChainId()
  const currentChain = defineChain({
    id: chainId,
    name: "Custom Chain",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: {
      default: {
        https: ["http://localhost:8545"]
      }
    }
  })
  return currentChain
}

async function getBalance() {
  if (typeof window.ethereum !== "undefined") {
    publicClient = createPublicClient({
      transport: custom(window.ethereum)
    })
    const balance = await publicClient.getBalance({
      address: contractAddress
    })
    console.log(`Balance: ${formatEther(balance)} Ether`)
  }
}
withdrawButton.onclick = withdraw
balanceButton.onclick = getBalance
connectButton.onclick = connect
fundButton.onclick = fund
