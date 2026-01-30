// ================================
// CONFIG
// ================================
const CONTRACT_ADDRESS = "0xb7b6c8a20f3E54C62FacA1a3e720bD73Ad469559";

const ABI = [
  "function stake(uint256 amount)",
  "function unstake(uint256 amount)",
  "function claimReward()",
  "function balanceOf(address) view returns (uint256)",
  "function getStakeInfo(address) view returns (uint256,uint256,uint256,uint256)"
];

let provider;
let signer;
let contract;

// ================================
// CONNECT METAMASK
// ================================
async function connect() {
  if (!window.ethereum) {
    alert("MetaMask non installé");
    return;
  }

  await ethereum.request({ method: "eth_requestAccounts" });

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  const address = await signer.getAddress();
  document.getElementById("wallet").innerText =
    "Wallet connecté : " + address.slice(0, 6) + "..." + address.slice(-4);
}

// ================================
// STAKE
// ================================
async function stake() {
  const amount = document.getElementById("stakeAmount").value;
  if (!amount) return alert("Montant requis");

  const tx = await contract.stake(
    ethers.utils.parseUnits(amount, 18)
  );
  await tx.wait();

  alert("Stake confirmé ✅");
}

// ================================
// CLAIM
// ================================
async function claim() {
  const tx = await contract.claimReward();
  await tx.wait();
  alert("Rewards réclamés ✅");
}

// ================================
// UNSTAKE
// ================================
async function unstake() {
  const amount = document.getElementById("unstakeAmount").value;
  if (!amount) return alert("Montant requis");

  const tx = await contract.unstake(
    ethers.utils.parseUnits(amount, 18)
  );
  await tx.wait();

  alert("Unstake confirmé ✅");
}
