import os
import psycopg_pool
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
pool = psycopg_pool.ConnectionPool(DATABASE_URL, min_size=2, max_size=30)

def execute_query(query: str, params: tuple = None, fetch_one: bool = False, fetch_all: bool = False, commit: bool = False):
    with pool.connection() as conn:
        with conn.cursor() as cur:
            cur.execute(query, params)
            result = None
            if fetch_one:
                result = cur.fetchone()
            elif fetch_all:
                result = cur.fetchall()
            if commit:
                conn.commit()
            return result

# def init_db():
#     execute_query("""
#         CREATE TABLE IF NOT EXISTS users (
#             id SERIAL PRIMARY KEY,
#             name VARCHAR(100) NOT NULL,
#             age INTEGER NOT NULL,
#             address TEXT NOT NULL,
#             hobby VARCHAR(100) NOT NULL,
#             course VARCHAR(100) NOT NULL
#         )
#     """, commit=True)