import { response } from "express";
import pool from "../config/sql.js";
import { json } from "body-parser";

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
    await pool.query("DELETE FROM todos WHERE completed = true ");

    return res
      .status(200)
      .json({ message: "All complete todos have been deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// export const deleteCompleteTodos = async (_, res) => {
//   try {
//     // Select all completed todos and get their IDs
//     const completedTodoIds = await pool.query(
//       "SELECT id FROM todos WHERE completed = true",
//     );

//     // Delete completed todos one by one
//     for (const todoId of completedTodoIds.rows) {
//       await pool.query("DELETE FROM todos WHERE id = $1", [todoId.id]);
//     }

//     return res
//       .status(200)
//       .json({ message: "All complete todos have been deleted" });
//   } catch (error) {
//     console.error("Error deleting complete todos:", error);
//     return res
//       .status(500)
//       .json({ error: "An error occurred while deleting complete todos" });
//   }
// };

export const deleteAllTodos = async (req, res) => {
  try {
    await pool.query("DELETE  FROM todos");
    return res.status(200).json({ message: "All todos have been deleted" });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const updateTodo = async (req, res) => {
  const { id } = +req.params;
  const completed = JSON.parse(req.body);
  console.log(completed);
  console.log(id);

  try {
    const resultQuery = await pool.query(
      "UPDATE todos SET completed=$1 WHERE id=$2",
      [completed, id],
    );

    return res.status(200).json(resultQuery.rows);
  } catch (error) {
    console.error(error);
    console.log(id, completed);
    return res.status(401).json(error);
  }
};
