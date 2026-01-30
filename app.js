let provider;
let signer;

async function connect() {
  if (!window.ethereum) {
    alert("MetaMask non détecté");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();

  const address = await signer.getAddress();

  const statusEl = document.getElementById("status");
  if (!statusEl) {
    console.error("Element #status introuvable");
    return;
  }

  statusEl.innerText = "Wallet connecté : " + address;
}

function stake() {
  alert("Stake appelé (à connecter au contrat ensuite)");
}

function claim() {
  alert("Claim appelé");
}

function unstake() {
  alert("Unstake appelé");
}
