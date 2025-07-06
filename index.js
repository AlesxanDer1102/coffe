import {
  createWalletClient,
  custom,
  createPublicClient,
} from "https://esm.sh/viem";
import { contractAddress } from "./constants";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const ethAmountInput = document.getElementById("ethAmount");

let walletClient;
let publicClient;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
    await walletClient.requestAddresses();
    connectButton.innerHTML = "Connected!";
  } else {
    connectButton.innerText = "Please install MetaMask";
  }
}

async function fund() {
  const ethAmount = ethAmountInput.value;
  console.log(`Funding with ${ethAmount} ETH...`);
  if (typeof window.ethereum !== "undefined") {
    walletClient = createWalletClient({
      transport: custom(window.ethereum),
    });
    await walletClient.requestAddresses();

    publicClient = createPublicClient({
      transport: custom(window.ethereum),
    });

    await publicClient.simulateContract({
      address: contractAddress,
    });
  } else {
    connectButton.innerText = "Please install MetaMask";
  }
}

connectButton.onclick = connect;
fundButton.onclick = fund;
