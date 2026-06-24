from database import execute_query

def row_to_dict(r):
    if r is None:
        return None
    return {"id": r[0], "name": r[1], "age": r[2], "address": r[3], "hobby": r[4], "course": r[5]}

def get_all_users():
      rows = execute_query("SELECT id, name, age, address, hobby, course FROM users", fetch_all=True)
      return [row_to_dict(r) for r in rows]

def get_user_by_id(user_id: int):
    return row_to_dict(execute_query(
        "SELECT id, name, age, address, hobby, course FROM users WHERE id = %s",
        (user_id,), fetch_one=True
    ))


def create_user(data):
    return row_to_dict(execute_query(
        "INSERT INTO users (name, age, address, hobby, course) VALUES (%s, %s, %s, %s, %s) RETURNING id, name, age, address, hobby, course",
        (data.name, data.age, data.address, data.hobby, data.course),
        fetch_one=True, commit=True
    ))


def update_user(user_id: int, data):
    return row_to_dict(execute_query(
        "UPDATE users SET name=%s, age=%s, address=%s, hobby=%s, course=%s WHERE id=%s RETURNING id, name, age, address, hobby, course",
        (data.name, data.age, data.address, data.hobby, data.course, user_id),
        fetch_one=True, commit=True
    ))

def patch_user(user_id: int, data):
    fields = {k: v for k, v in data.model_dump().items() if v is not None}
    if not fields:
        return None
    set_clause = ", ".join(f"{k} = %s" for k in fields)
    values = list(fields.values()) + [user_id]
    return row_to_dict(execute_query(
        f"UPDATE users SET {set_clause} WHERE id = %s RETURNING id, name, age, address, hobby, course",
        values, fetch_one=True, commit=True
    ))

def delete_user(user_id: int):
    r = execute_query("DELETE FROM users WHERE id = %s RETURNING id", (user_id,), fetch_one=True, commit=True)
    return r is not None