import sqlite3

conn = sqlite3.connect("backend/database/data.db")
cursor = conn.cursor()

# Create tables
cursor.execute("""
    CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY,
        type TEXT,
        available BOOLEAN
    )
""")
cursor.execute("""
    CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY,
        room_id INTEGER,
        user TEXT,
        nights INTEGER
    )
""")
conn.commit()