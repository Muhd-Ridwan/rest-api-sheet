# REST API Demo

`Self Learning, Curiosity`<br>
An interactive full-stack demo for presenting REST API concepts. Users can fire live HTTP requests from the browser and see real responses — built for a live presentation to show GET, POST, PUT, PATCH, and DELETE in action.
I built this because also want to learn on how to hosted it in VPS by using docker. <br>
It's live but I stopped the backend service. Ping me if want to try it on prod.<br>
Visit Here &rarr; ```https://racs.dev-r.org```

## Tech Stack

| Layer            | Tech                                         |
| ---------------- | -------------------------------------------- |
| Backend          | FastAPI + Python                             |
| Database         | PostgreSQL (psycopg3 + psycopg-pool, no ORM) |
| Frontend         | React Javascript + Tailwind CSS v4            |
| DB Hosting       | VPS (systemd)                                |
| Frontend Hosting | Cloudflare Pages                             |

---

## File Structure

```
rest-api-sheet/
├── backend/
│   ├── main.py          # FastAPI app, CORS, all 6 endpoints
│   ├── crud.py          # All database operations
│   ├── database.py      # psycopg_pool connection pool + execute_query helper
│   ├── schemas.py       # Pydantic models (UserCreate, UserUpdate, UserPatch, UserResponse)
│   ├── requirements.txt
│   └── .env             # DATABASE_URL
├── db/
│   └── init.sql         # Creates resapi user, grants privileges, creates users table
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    ├── .env             # VITE_API_URL
    └── src/
        ├── App.jsx      # State hub — all state and handlers live here
        ├── index.css    # Tailwind v4 import
        └── components/
            ├── DescriptionCard.jsx  # Describes the selected endpoint, colored border per method
            ├── StatusLegend.jsx     # Static display of all 8 status codes
            ├── InputPanel.jsx       # Endpoint selector, dynamic fields, Send/Clear buttons
            ├── UrlDisplay.jsx       # Live URL preview
            ├── JsonPreview.jsx      # Live request body preview
            └── ResultPanel.jsx      # Response table + status code badge + response time
```

---
<p>GET Method</p>
<img width="1469" height="803" alt="image" src="https://github.com/user-attachments/assets/b201ccc5-3180-4e33-bc4a-e3cbf23cc8e1" />
<p>POST Method</p>
<img width="1470" height="800" alt="image" src="https://github.com/user-attachments/assets/3b6322a1-a9b9-4751-b6b6-67111698ad3a" />
<p>PUT Method</p>
<img width="1223" height="892" alt="image" src="https://github.com/user-attachments/assets/4155afdd-59bf-4439-9329-0655df0914d7" />
<p>PATCH Method</p>
<img width="1185" height="888" alt="image" src="https://github.com/user-attachments/assets/3eb01dc5-0287-4288-bd27-c639cd0d6f3a" />
<p>DELETE Method</p>
<img width="1214" height="611" alt="image" src="https://github.com/user-attachments/assets/432ae24d-5e44-47ce-92df-a4df857788a4" />

```

```
## API Endpoints

Base URL: `http://localhost:8000`

| Method | Endpoint      | Description                                   |
| ------ | ------------- | --------------------------------------------- |
| GET    | `/users`      | Get all users                                 |
| GET    | `/users/{id}` | Get a single user by ID                       |
| POST   | `/users`      | Create a new user                             |
| PUT    | `/users/{id}` | Fully replace a user (all fields required)    |
| PATCH  | `/users/{id}` | Partially update a user (all fields optional) |
| DELETE | `/users/{id}` | Delete a user                                 |

### Request body fields (POST / PUT / PATCH)

```json
{
  "name": "string",
  "age": 0,
  "address": "string",
  "hobby": "string",
  "course": "string"
}
```

---

## Setup

### 1. Database

Connect to PostgreSQL as a superuser and run:

```sql
-- init.sql creates the resapi user and grants privileges
\i db/init.sql
```

Then create the users table:

```sql
CREATE TABLE IF NOT EXISTS users (
    id      SERIAL PRIMARY KEY,
    name    TEXT    NOT NULL,
    age     INTEGER NOT NULL,
    address TEXT    NOT NULL,
    hobby   TEXT    NOT NULL,
    course  TEXT    NOT NULL
);
```

Grant the resapi user access to the table:

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE users TO resapi;
GRANT USAGE, SELECT ON SEQUENCE users_id_seq TO resapi;
```

### 2. Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create `backend/.env`:

```env
DATABASE_URL=postgresql://resapi:resapi@localhost:5432/rest_api_demo
```

Run the server:

```bash
uvicorn main:app --reload
```

Backend runs at `http://localhost:8000`.

### 3. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:8000
```

Run the dev server:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## Deployment

### Backend (VPS)

Run with uvicorn behind a systemd service. Update CORS in `main.py` with your Cloudflare Pages URL:

```python
allow_origins=["http://localhost:5173", "https://your-site.pages.dev"]
```

### Frontend (Cloudflare Pages)

Set the environment variable in the Cloudflare Pages dashboard:

```
VITE_API_URL=https://your-backend-url.com
```

---

## Build Guide

For presentation of REST API such as the most common one is GET, PUT, POST, DELETE, PATCH

### Backend (FastAPI)

1. Create `backend` folder
2. `cd` into `backend`

```bash
3. python -m venv venv
4. venv\Scripts\activate        # Windows
   source venv/bin/activate     # Mac/Linux
5. pip install uvicorn
6. pip install fastapi
7. pip install psycopg[binary] psycopg-pool python-dotenv
8. pip freeze > requirements.txt
```

9. Create `.env` inside `backend`

```env
DATABASE_URL=postgresql://resapi:resapi@localhost:5432/rest_api_demo
```

10. Create `main.py` — FastAPI app with CORS and all endpoints

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import UserCreate, UserUpdate, UserPatch
import crud

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/health")
def check_health():
    return ({ "message": "Hi", "status": "ok" })
```
