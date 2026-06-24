CREATE TABLE IF NOT EXISTS users (
    id      SERIAL PRIMARY KEY,
    name    TEXT    NOT NULL,
    age     INTEGER NOT NULL,
    address TEXT    NOT NULL,
    hobby   TEXT    NOT NULL,
    course  TEXT    NOT NULL
);