CREATE TABLE IF NOT EXISTS users (
      id      SERIAL PRIMARY KEY,
      name    TEXT    NOT NULL,
      age     INTEGER NOT NULL,
      address TEXT    NOT NULL,
      hobby   TEXT    NOT NULL,
      course  TEXT    NOT NULL
  );

-- Create user if not exists
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'resapi') THEN
      CREATE USER resapi WITH PASSWORD 'resapi';
    END IF;
  END
  $$;

  -- Grant connect on the database
  GRANT CONNECT ON DATABASE rest_api_demo TO resapi;

  -- Grant usage on public schema
  GRANT USAGE ON SCHEMA public TO resapi;

  -- Grant table privileges
  GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO resapi;

  -- Grant sequence privileges (needed for auto-increment id)
  GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO resapi;

  -- Apply same grants to future tables/sequences automatically
  ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO resapi;

  ALTER DEFAULT PRIVILEGES IN SCHEMA public
    GRANT USAGE, SELECT ON SEQUENCES TO resapi;