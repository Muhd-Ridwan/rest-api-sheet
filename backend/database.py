import time
import psycopg_pool
from config import settings

pool = None

def create_pool():
    retries = 5
    while retries:
        try:
            return psycopg_pool.ConnectionPool(settings.DATABASE_URL, min_size=2, max_size=30)
        except Exception as e:
            retries -= 1
            print(f"DB not ready, retrying... ({e})")
            time.sleep(3)
    raise Exception("Could not connect to the database")

pool = create_pool()

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