let provider;
let signer;
let contract;
let userAddress;

// 🔴 ADRESSE DE TON CONTRAT
const CONTRACT_ADDRESS = "0xb7b6c8a20f3E54C62FacA1a3e720bD73Ad469559";

// 🔴 ABI MINIMALE (stake / unstake / claim)
const ABI = [
  "function stake(uint256 amount)",
  "function unstake(uint256 amount)",
  "function claimReward()",
];

async function connect() {
  if (!window.ethereum) {
    alert("MetaMask non détecté");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  userAddress = await signer.getAddress();

  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  document.getElementById("walletStatus").innerText =
    "Wallet connecté : " + userAddress;
}

// ✅ STAKE
async function stake() {
  const amount = document.getElementById("stakeAmount").value;
  if (!amount) {
    alert("Entre un montant");
    return;
  }

  const value = ethers.utils.parseEther(amount);
  const tx = await contract.stake(value);
  await tx.wait();

  alert("Stake confirmé");
}

// ✅ CLAIM
async function claim() {
  const tx = await contract.claimReward();
  await tx.wait();
  alert("Rewards réclamés");
}

// ✅ UNSTAKE
async function unstake() {
  const amount = document.getElementById("unstakeAmount").value;
  if (!amount) {
    alert("Entre un montant");
    return;
  }

  const value = ethers.utils.parseEther(amount);
  const tx = await contract.unstake(value);
  await tx.wait();

  alert("Unstake confirmé");
}
