import pgk from "pg";

const { Pool } = pgk;

const pool = new Pool({
  host: "dpg-cjqb5c8jbais739i2trg-a",
  port: 5432,
  database: "todos_38ui",
  user: "todos_38ui_user",
  password: "KMW0AevL8KwDI0n6kbigsVUKeRSDvKWQ",
});

export const createTable = async () => {
  return await pool.query(
    "CREATE TABLE IF NOT EXISTS todos (id SERIAL PRIMARY KEY, value TEXT, completed BOOLEAN)",
  );
};

export default pool;
