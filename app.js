const contractAddress = "0xb7b6c8a20f3E54C62FacA1a3e720bD73Ad469559";

const abi = [
  "function stake(uint256 amount)",
  "function unstake(uint256 amount)",
  "function claimReward()",
];

let provider, signer, contract;

async function connect() {
  if (!window.ethereum) return alert("Installe MetaMask");

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();

  contract = new ethers.Contract(contractAddress, abi, signer);

  const address = await signer.getAddress();
  document.getElementById("wallet").innerText = "Wallet : " + address;
}

async function stake() {
  const amount = document.getElementById("stakeAmount").value;
  const tx = await contract.stake(ethers.utils.parseUnits(amount, 18));
  await tx.wait();
  alert("Stake confirmé");
}

async function claim() {
  const tx = await contract.claimReward();
  await tx.wait();
  alert("Rewards claim");
}

async function unstake() {
  const amount = document.getElementById("unstakeAmount").value;
  const tx = await contract.unstake(ethers.utils.parseUnits(amount, 18));
  await tx.wait();
  alert("Unstake confirmé");
}
