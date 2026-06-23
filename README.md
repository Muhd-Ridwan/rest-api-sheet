# rest-api-sheet

For presentation of REST API such as the most common one is GET, PUT, POST, DELETE, PATCH

To Create Backend API (Fast Api)

1. Create backend folder
2. cd into backend

```
3. python -m venv venv
4. pip install uvicorn
5. pip install fastapi
6. Create main.py inside backend
7. from fastapi import FastAPI
8. app = FastAPI()
9. @app.get("/health")
10. def check_health:
        return ({ "message": "Hi", "status": "ok" })
```
