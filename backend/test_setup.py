from database import SessionLocal
from passlib.context import CryptContext
import sys

def test_hashing():
    print("Testing Hashing...")
    try:
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        hash = pwd_context.hash("test")
        print(f"Hashing successful: {hash}")
    except Exception as e:
        print(f"Hashing FAILED: {e}")

def test_db():
    print("Testing DB Connection...")
    try:
        db = SessionLocal()
        # Try a simple execute
        from sqlalchemy import text
        db.execute(text("SELECT 1"))
        print("DB Connection successful")
        db.close()
    except Exception as e:
        print(f"DB Connection FAILED: {e}")

if __name__ == "__main__":
    test_hashing()
    test_db()
