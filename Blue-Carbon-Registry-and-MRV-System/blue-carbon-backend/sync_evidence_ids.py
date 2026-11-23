import json
import os
from web3 import Web3
from database import SessionLocal
from models.db_model import MRVData
from hexbytes import HexBytes

# Configure Web3
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
REGISTRY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

# Load ABI
REGISTRY_ABI_PATH = os.path.join(os.path.dirname(__file__), "contracts", "BlueCarbonRegistry.json")
with open(REGISTRY_ABI_PATH, "r", encoding="utf-8") as f:
    REGISTRY_ABI = json.load(f)["abi"]

registry = w3.eth.contract(address=Web3.to_checksum_address(REGISTRY_ADDRESS), abi=REGISTRY_ABI)

def sync_evidence():
    db = SessionLocal()
    try:
        # Get all evidence from blockchain
        print("Fetching evidence from blockchain...")
        # Since we don't have a direct 'getAllEvidence' we'll use events
        events = registry.events.EvidenceUploaded().get_logs(fromBlock=0)
        
        blockchain_map = {} # evidenceHash -> evidenceId
        for event in events:
            h = "0x" + event["args"]["evidenceHash"].hex()
            eid = int(event["args"]["evidenceId"])
            blockchain_map[h] = eid
            print(f"Found on chain: Hash {h[:10]}... -> ID {eid}")

        # Update database
        db_evidences = db.query(MRVData).filter(MRVData.blockchain_id == None).all()
        updated_count = 0
        
        for e in db_evidences:
            if e.evidence_hash in blockchain_map:
                e.blockchain_id = blockchain_map[e.evidence_hash]
                print(f"Syncing DB ID {e.id}: matched with Blockchain ID {e.blockchain_id}")
                updated_count += 1
            else:
                print(f"Warning: DB ID {e.id} (Hash {e.evidence_hash[:10]}...) not found on blockchain.")

        db.commit()
        print(f"Successfully synced {updated_count} evidence records.")

    except Exception as ex:
        print(f"Error: {ex}")
    finally:
        db.close()

if __name__ == "__main__":
    sync_evidence()
