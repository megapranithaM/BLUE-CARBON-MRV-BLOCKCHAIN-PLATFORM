import sqlite3
import os

db_path = 'bluecarbon.db'
if not os.path.exists(db_path):
    print(f"Database file {db_path} not found.")
else:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Delete all data from 프로젝트 related tables to force re-sync
    print("Resetting database tables...")
    try:
        cursor.execute("DELETE FROM mrvdata")
        print("Cleared mrvdata table.")
        cursor.execute("DELETE FROM projects")
        print("Cleared projects table.")
        conn.commit()
        print("Database reset successful.")
    except Exception as e:
        print(f"Error resetting database: {e}")
        conn.rollback()
            
    conn.close()
