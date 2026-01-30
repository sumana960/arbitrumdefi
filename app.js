const contractAddress = "0xb7b6c8a20f3E54C62FacA1a3e720bD73Ad469559";

const abi = [
  "function stake(uint256 amount)",
  "function unstake(uint256 amount)",
  "function claimReward()"
];

let provider;
let signer;
let contract;

async function connect() {
  if (!window.ethereum) {
    alert("MetaMask non détecté");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();

  const address = await signer.getAddress();
  document.getElementById("wallet").innerText =
    "Wallet connecté : " + address;

  contract = new ethers.Contract(contractAddress, abi, signer);
}

async function stake() {
  const amount = document.getElementById("stakeAmount").value;
  if (!amount) return alert("Entre un montant");

  const tx = await contract.stake(
    ethers.utils.parseEther(amount.toString())
  );
  await tx.wait();
  alert("Stake confirmé");
}

async function claim() {
  const tx = await contract.claimReward();
  await tx.wait();
  alert("Rewards claimés");
}

async function unstake() {
  const amount = document.getElementById("unstakeAmount").value;
  if (!amount) return alert("Entre un montant");

  const tx = await contract.unstake(
    ethers.utils.parseEther(amount.toString())
  );
  await tx.wait();
  alert("Unstake confirmé");
}
