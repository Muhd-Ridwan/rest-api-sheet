from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# from database import init_db
from schemas import UserCreate, UserUpdate, UserPatch
import crud

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://racs.dev-r.org"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# @app.on_event("startup")
# def startup():
#     init_db()

@app.get("/health")
def check_health():
    return ({ "message": "Hi There", "status": "ok" })

@app.get("/users")
def get_users():
    return crud.get_all_users()

@app.get("/users/{user_id}")
def get_user(user_id: int):
    user = crud.get_user_by_id(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/users", status_code=201)
def create_user(data: UserCreate):
    return crud.create_user(data)

@app.put("/users/{user_id}")
def update_user(user_id: int, data: UserUpdate):
    user = crud.update_user(user_id, data)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
    
@app.patch("/users/{user_id}")
def patch_user(user_id: int, data: UserPatch):
    user = crud.patch_user(user_id, data)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    deleted = crud.delete_user(user_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User deleted successfully"}