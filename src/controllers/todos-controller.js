import { response } from "express";
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
    return res.status(200).json(row);
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const deleteTodo = async (req, res) => {
  const id = +req.params.id;

  try {
    await pool.query("DELETE FROM todos WHERE id=$1", [id]);

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const deleteCompleteTodos = async (_, res) => {
  try {
    await pool.query("DELETE FROM todos WHERE completed = 1 ");

    return res
      .status(200)
      .json({ message: "All complete todos have been deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
