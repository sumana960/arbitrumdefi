// ===== CONFIG =====
const CONTRACT_ADDRESS = "0xb7b6c8a20f3E54C62FacA1a3e720bD73Ad469559";

const ABI = [
  "function stake(uint256 amount)",
  "function unstake(uint256 amount)",
  "function claimReward()"
];

let provider;
let signer;
let contract;

// ===== CONNECT =====
async function connect() {
  if (!window.ethereum) {
    alert("MetaMask non installé");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);

  signer = await provider.getSigner();
  const address = await signer.getAddress();

  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  const statusEl = document.getElementById("status");
  if (!statusEl) {
    console.error("ID status introuvable");
    return;
  }

  statusEl.innerText = "Wallet connecté : " + address;
}

// ===== STAKE =====
async function stake() {
  const amount = document.getElementById("stakeAmount").value;
  if (!amount) return alert("Montant requis");

  const tx = await contract.stake(ethers.parseUnits(amount, 18));
  await tx.wait();

  alert("Stake confirmé");
}

// ===== CLAIM =====
async function claim() {
  const tx = await contract.claimReward();
  await tx.wait();

  alert("Rewards réclamés");
}

// ===== UNSTAKE =====
async function unstake() {
  const amount = document.getElementById("unstakeAmount").value;
  if (!amount) return alert("Montant requis");

  const tx = await contract.unstake(ethers.parseUnits(amount, 18));
  await tx.wait();

  alert("Unstake confirmé");
}
