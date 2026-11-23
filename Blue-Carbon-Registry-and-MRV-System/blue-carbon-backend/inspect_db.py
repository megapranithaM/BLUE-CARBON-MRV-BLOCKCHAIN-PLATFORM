import sqlite3
import os

db_path = 'bluecarbon.db'
if not os.path.exists(db_path):
    print(f"Database file {db_path} not found.")
else:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    tables = ['projects', 'mrvdata', 'users']
    for table in tables:
        print(f"\n--- Table: {table} ---")
        try:
            cursor.execute(f"PRAGMA table_info({table})")
            columns = cursor.fetchall()
            for col in columns:
                print(f"Column: {col[1]} ({col[2]})")
        except Exception as e:
            print(f"Error reading table {table}: {e}")
            
    conn.close()
