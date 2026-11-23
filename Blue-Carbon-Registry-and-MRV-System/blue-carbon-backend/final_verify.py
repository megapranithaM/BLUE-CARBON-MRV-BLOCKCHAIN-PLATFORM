import requests
import os
import time

BASE_URL = "http://127.0.0.1:8000"

def verify_system():
    print("--- System Verification Starting ---")
    
    # 1. Login
    print("\n1. Logging in...")
    login_data = {"username": "admin", "password": "admin123"}
    resp = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    if resp.status_code != 200:
        print(f"FAILED: Login failed: {resp.text}")
        return False
    token = resp.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}"}
    print("OK: Logged in.")

    # 2. Register Project
    print("\n2. Registering project...")
    project_data = {
        "name": "Verification Test Mangrove",
        "location": "Pichavaram",
        "hectares": 10,
        "owner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "metadata": "Verification test"
    }
    resp = requests.post(f"{BASE_URL}/projects", json=project_data, headers=headers)
    if resp.status_code != 200:
        print(f"FAILED: Project registration: {resp.text}")
        return False
    reg_data = resp.json()
    project_id = reg_data.get("project_id")
    blockchain_id = reg_data.get("blockchain_id")
    print(f"OK: Project registered. DB ID: {project_id}, Blockchain ID: {blockchain_id}")

    # 3. Upload Evidence
    print("\n3. Uploading evidence...")
    dummy_img = "test_verify.png"
    with open(dummy_img, "wb") as f:
        f.write(b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xf8\xff\xff?\x00\x05\xfe\x02\xfe\xdcD\x05\xe8\x00\x00\x00\x00IEND\xaeB`\x82")
    
    with open(dummy_img, 'rb') as img_file:
        files = [('files', (dummy_img, img_file, 'image/png'))]
        data = {
            "project_id": project_id,
            "uploader": "admin",
            "gps": "11.425, 79.782",
            "co2": 100.0,
            "evidence_type": "general",
            "project_area_hectares": 10.0,
            "time_period_years": 1.0
        }
        resp = requests.post(f"{BASE_URL}/upload", files=files, data=data, headers=headers)
    
    if resp.status_code != 200:
        print(f"FAILED: Evidence upload: {resp.text}")
        return False
    evidence_id = resp.json().get("evidence_id")
    print(f"OK: Evidence uploaded. ID: {evidence_id}")

    # 4. Verify & Mint
    print("\n4. Verifying and Minting credits...")
    verify_data = {
        "evidence_id": int(evidence_id),
        "mint_receipt": True,
        "receipt_token_uri": "ipfs://test",
        "mint_amount": 1000
    }
    resp = requests.post(f"{BASE_URL}/verify", json=verify_data, headers=headers)
    if resp.status_code != 200:
        print(f"FAILED: Verification: {resp.text}")
        return False
    print("OK: Credits minted.")

    # 5. Final Status Check
    print("\n5. Checking final project status...")
    resp = requests.get(f"{BASE_URL}/projects/{project_id}")
    final_proj = resp.json()
    credits = final_proj.get("totalIssuedCredits", 0)
    print(f"Project: {final_proj.get('name')}")
    print(f"Credits: {credits}")
    
    if credits == 1000:
        print("\n✅ SYSTEM VERIFICATION SUCCESSFUL: Everything works correctly and accurately.")
        return True
    else:
        print(f"\n❌ FAILED: Credit count mismatch. Expected 1000, got {credits}.")
        return False

if __name__ == "__main__":
    if verify_system():
        exit(0)
    else:
        exit(1)
