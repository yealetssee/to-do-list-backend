import express from "express";
import {
  createTodo,
  deleteAllTodos,
  deleteCompleteTodos,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todos-controller.js";

const todoRouter = express.Router();

todoRouter.delete("/todos/complete", deleteCompleteTodos);
todoRouter.delete("/todos/:id", deleteTodo);

todoRouter.delete("/todos", deleteAllTodos);
todoRouter.put("/todos/:id", updateTodo);
todoRouter.get("/todos", getAllTodos);

todoRouter.post("/todos", createTodo);

export default todoRouter;
