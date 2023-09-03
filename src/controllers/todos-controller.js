import pool from "../config/sql.js";

export const getAllTodos = async (_, response) => {
  try {
    const resultQuery = await pool.query("SELECT * FROM todos");

    const rows = resultQuery.rows;

    return response.status(200).json(rows);
  } catch (error) {
    return response.status(401).json(error);
  }
};

export const createTodo = async (req, res) => {
  const { value, completed } = req.body;
  try {
    const resultQuery = await pool.query(
      "INSERT INTO todos(value, completed) VALUES($1, $2) ",
      [value, completed],
    );

    const row = resultQuery.rows[0];
    return response.status(200).json(row);
  } catch (error) {
    return response.status(401).json(error);
  }
};
