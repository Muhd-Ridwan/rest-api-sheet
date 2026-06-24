from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    name: str
    age: int
    address: str
    hobby: str
    course: str

class UserUpdate(BaseModel):
    name: str
    age: int
    address: str
    hobby: str
    course: str

class UserPatch(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    address: Optional[str] = None
    hobby: Optional[str] = None
    course: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    name: str
    age: int
    address: str
    hobby: str
    course: str