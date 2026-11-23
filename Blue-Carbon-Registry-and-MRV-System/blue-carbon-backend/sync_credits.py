import sqlite3
import json
from web3 import Web3
import os

def sync_credits():
    # Blockchain setup
    RPC_URL = "http://127.0.0.1:8545"
    REGISTRY_ADDRESS = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318"
    
    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    if not w3.is_connected():
        print("Not connected to blockchain")
        return

    # Load ABI
    abi_path = os.path.join(os.path.dirname(__file__), "contracts", "BlueCarbonRegistry.json")
    with open(abi_path, "r") as f:
        registry_abi = json.load(f)["abi"]
    
    registry = w3.eth.contract(address=Web3.to_checksum_address(REGISTRY_ADDRESS), abi=registry_abi)

    # Database setup
    db_path = 'bluecarbon.db'
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    try:
        cursor.execute('SELECT id, blockchain_id FROM projects')
        projects = cursor.fetchall()
        
        for pid, bid in projects:
            if bid is not None:
                try:
                    p_data = registry.functions.projects(bid).call()
                    credits = float(p_data[6])
                    cursor.execute('UPDATE projects SET total_issued_credits = ? WHERE id = ?', (credits, pid))
                    print(f"Updated Project {pid} (Blockchain ID {bid}) with {credits} credits")
                except Exception as e:
                    print(f"Error fetching from blockchain for project {pid} (bid {bid}): {e}")
        
        conn.commit()
    finally:
        conn.close()

if __name__ == "__main__":
    sync_credits()