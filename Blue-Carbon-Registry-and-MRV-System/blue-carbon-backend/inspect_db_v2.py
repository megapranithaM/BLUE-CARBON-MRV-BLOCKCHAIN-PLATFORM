import sqlite3
import os

db_path = 'bluecarbon.db'
with open('db_schema.txt', 'w') as f:
    if not os.path.exists(db_path):
        f.write(f"Database file {db_path} not found.\n")
    else:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        tables = ['projects', 'mrvdata', 'users']
        for table in tables:
            f.write(f"\n--- Table: {table} ---\n")
            try:
                cursor.execute(f"PRAGMA table_info({table})")
                columns = cursor.fetchall()
                for col in columns:
                    f.write(f"Column: {col[1]} ({col[2]})\n")
            except Exception as e:
                f.write(f"Error reading table {table}: {e}\n")
                
        conn.close()
