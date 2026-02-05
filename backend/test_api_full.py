import requests
import uuid
import sys

BASE_URL = "http://localhost:8000"

def test_api():
    print("Starting API Tests...")
    
    unique_user = f"user_{uuid.uuid4().hex[:8]}"
    password = "testpassword123"
    
    # 1. Register
    print(f"\n1. Testing Registration for {unique_user}...")
    try:
        resp = requests.post(f"{BASE_URL}/users/", json={"username": unique_user, "password": password})
        if resp.status_code == 200:
            print("   Registration SUCCESS")
        else:
            print(f"   Registration FAILED: {resp.status_code} - {resp.text}")
            sys.exit(1)
    except Exception as e:
        print(f"   Registration FALIED (Exception): {e}")
        sys.exit(1)

    # 2. Login
    print("\n2. Testing Login...")
    token = None
    try:
        resp = requests.post(f"{BASE_URL}/token", data={"username": unique_user, "password": password})
        if resp.status_code == 200:
            token = resp.json()["access_token"]
            print("   Login SUCCESS")
        else:
            print(f"   Login FAILED: {resp.status_code} - {resp.text}")
            sys.exit(1)
    except Exception as e:
        print(f"   Login FAILED (Exception): {e}")
        sys.exit(1)

    headers = {"Authorization": f"Bearer {token}"}

    # 3. Create Todo
    print("\n3. Testing Create Todo...")
    todo_id = None
    try:
        resp = requests.post(f"{BASE_URL}/todos/", json={"title": "Test Todo", "description": "Test Desc"}, headers=headers)
        if resp.status_code == 200:
            todo_data = resp.json()
            todo_id = todo_data["id"]
            print("   Create Todo SUCCESS")
        else:
            print(f"   Create Todo FAILED: {resp.status_code} - {resp.text}")
            sys.exit(1)
    except Exception as e:
         print(f"   Create Todo FAILED (Exception): {e}")

    # 4. Get Todos
    print("\n4. Testing Get Todos...")
    try:
        resp = requests.get(f"{BASE_URL}/todos/", headers=headers)
        if resp.status_code == 200:
            todos = resp.json()
            if len(todos) > 0:
                 print(f"   Get Todos SUCCESS (Found {len(todos)} todos)")
            else:
                 print("   Get Todos WARNING: Returned empty list but 200 OK")
        else:
            print(f"   Get Todos FAILED: {resp.status_code} - {resp.text}")
    except Exception as e:
         print(f"   Get Todos FAILED (Exception): {e}")

    # 5. Delete Todo
    if todo_id:
        print(f"\n5. Testing Delete Todo (ID: {todo_id})...")
        try:
             resp = requests.delete(f"{BASE_URL}/todos/{todo_id}", headers=headers)
             if resp.status_code == 200:
                 print("   Delete Todo SUCCESS")
             else:
                 print(f"   Delete Todo FAILED: {resp.status_code} - {resp.text}")
        except Exception as e:
             print(f"   Delete Todo FAILED (Exception): {e}")

    print("\nAll Tests Completed.")

if __name__ == "__main__":
    try:
        test_api()
    except Exception as main_e:
        print(f"Test Script Crashed: {main_e}")
