import os

# Blockchain config
RPC_URL = "http://127.0.0.1:8545"
PRIVATE_KEY = os.getenv("PRIVATE_KEY")

# Default to Hardhat private key if not set
if not PRIVATE_KEY:
    PRIVATE_KEY = "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"  

CONTRACT_ADDRESS = "0x59b670e9fA9D0A427751Af201D676719a970857b"  # Updated after deploy
TOKEN_ADDRESS = "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d"
CONTRACT_ABI_PATH = "contracts/BlueCarbonRegistry.json"

# Database config
DB_URL = f"sqlite:///{os.path.abspath('bluecarbon.db')}"

# IPFS config
IPFS_HOST = "/ip4/127.0.0.1/tcp/5001/http"
