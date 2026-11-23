import sqlite3
import os

db_path = "bluecarbon.db"

if not os.path.exists(db_path):
    print(f"Error: {db_path} not found.")
    exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    # Check if column already exists
    cursor.execute("PRAGMA table_info(mrvdata)")
    columns = [col[1] for col in cursor.fetchall()]
    
    if "blockchain_id" not in columns:
        print("Adding blockchain_id column to mrvdata table...")
        cursor.execute("ALTER TABLE mrvdata ADD COLUMN blockchain_id INTEGER")
        conn.commit()
        print("Column added successfully.")
    else:
        print("blockchain_id column already exists.")

except Exception as e:
    print(f"An error occurred: {e}")
finally:
    conn.close()
