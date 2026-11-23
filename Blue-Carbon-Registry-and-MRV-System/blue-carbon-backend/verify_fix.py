import requests
import time
import json
import os

BASE_URL = "http://127.0.0.1:8000"

def test_flow():
    print("--- Starting verification flow test ---")
    
    # 1. Login
    print("\n1. Logging in...")
    try:
        login_data = {"username": "admin", "password": "admin123"}
        resp = requests.post(f"{BASE_URL}/auth/login", json=login_data)
        resp.raise_for_status()
        token = resp.json().get("access_token")
        headers = {"Authorization": f"Bearer {token}"}
        print("Logged in successfully.")
    except Exception as e:
        print(f"Login failed: {e}")
        if hasattr(e, 'response') and e.response is not None:
             print(f"Details: {e.response.text}")
        return

    # 2. Register Project
    print("\n2. Registering project...")
    try:
        project_data = {
            "name": "Mangrove Restoration TN",
            "location": "Pichavaram, Tamil Nadu",
            "hectares": 120,
            "owner": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            "metadata": "Restoration area near Pichavaram mangrove forest."
        }
        resp = requests.post(f"{BASE_URL}/projects", json=project_data, headers=headers)
        if resp.status_code != 200:
            print(f"Project registration failed ({resp.status_code}): {resp.text}")
            return
        project = resp.json()
        print(f"Registration Response: {project}")
        project_id = project.get("project_id")
        blockchain_id = project.get("blockchain_id")
        print(f"Project registered. DB ID: {project_id}, Blockchain ID: {blockchain_id}")
    except Exception as e:
        print(f"Project registration exception: {e}")
        return

    # 3. Upload Evidence
    print("\n3. Uploading evidence...")
    try:
        dummy_img = "dummy.png"
        if not os.path.exists(dummy_img):
            with open(dummy_img, "wb") as f:
                f.write(b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xf8\xff\xff?\x00\x05\xfe\x02\xfe\xdcD\x05\xe8\x00\x00\x00\x00IEND\xaeB`\x82")
        
        with open(dummy_img, 'rb') as img_file:
            files = [('files', (dummy_img, img_file, 'image/png'))]
            data = {
                "project_id": project_id,
                "uploader": "admin",
                "gps": "11.4253, 79.7820",
                "co2": 1500.0,
                "evidence_type": "general",
                "project_area_hectares": 120.0,
                "time_period_years": 1.0
            }
            resp = requests.post(f"{BASE_URL}/upload", files=files, data=data, headers=headers)
        
        if resp.status_code != 200:
            print(f"Evidence upload failed ({resp.status_code}): {resp.text}")
            return
        evidence = resp.json()
        evidence_id = evidence.get("evidence_id")
        print(f"Evidence uploaded. ID: {evidence_id}")
    except Exception as e:
        print(f"Evidence upload exception: {e}")
        return

    # 4. Verify Evidence
    print("\n4. Verifying evidence (Minting credits)...")
    try:
        verify_data = {
            "evidence_id": int(evidence_id),
            "mint_receipt": True,
            "receipt_token_uri": "ipfs://metadata-hash",
            "mint_amount": 5000
        }
        resp = requests.post(f"{BASE_URL}/verify", json=verify_data, headers=headers)
        if resp.status_code != 200:
            print(f"Verification failed ({resp.status_code}): {resp.text}")
            return
        result = resp.json()
        print(f"Verification successful. TX: {result.get('tx_hash')}")
    except Exception as e:
        print(f"Verification exception: {e}")
        return

    # 5. Check Project Status
    print("\n5. Checking project status...")
    try:
        resp = requests.get(f"{BASE_URL}/projects/{project_id}")
        resp.raise_for_status()
        final_proj = resp.json()
        credits = final_proj.get("totalIssuedCredits", 0)
        print(f"Project Name: {final_proj.get('name')}")
        print(f"Total Issued Credits: {credits}")
        
        if credits > 0:
            print("\n✅ SUCCESS: Project verification fix confirmed. Credits are > 0.")
        else:
            print("\n❌ FAILURE: Project has 0 credits after verification.")
    except Exception as e:
        print(f"Status check failed: {e}")

if __name__ == "__main__":
    test_flow()
