import json
import os
from web3 import Web3
from database import SessionLocal
from models.db_model import MRVData, ProjectData

# Configure Web3
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
REGISTRY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
DEFAULT_HARDHAT_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
OWNER = w3.eth.accounts[0]

# Load ABI
REGISTRY_ABI_PATH = os.path.join(os.path.dirname(__file__), "contracts", "BlueCarbonRegistry.json")
with open(REGISTRY_ABI_PATH, "r", encoding="utf-8") as f:
    REGISTRY_ABI = json.load(f)["abi"]

registry = w3.eth.contract(address=Web3.to_checksum_address(REGISTRY_ADDRESS), abi=REGISTRY_ABI)

def test_build():
    evidence_id = 2 # Blockchain ID for Evidence 4
    mint_receipt = True
    receipt_token_uri = ""
    credits_to_mint = 100
    
    try:
        print(f"Building transaction for evidence {evidence_id}...")
        tx = registry.functions.verifyEvidenceAndIssue(
            evidence_id,
            mint_receipt,
            receipt_token_uri,
            credits_to_mint
        ).build_transaction({
            "from": OWNER,
            "nonce": w3.eth.get_transaction_count(OWNER),
            "gas": 2_000_000,
            "gasPrice": w3.to_wei("20", "gwei")
        })
        print("Success! Transaction built.")
        print(tx)
    except Exception as e:
        print(f"Error building transaction: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_build()
