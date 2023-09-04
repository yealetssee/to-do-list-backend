import express from "express";
import {
  createTodo,
  deleteAllTodos,
  deleteCompleteTodos,
  deleteTodo,
  getAllTodos,
} from "../controllers/todos-controller.js";

const todoRouter = express.Router();

todoRouter.delete("/todos/:id", deleteTodo);
todoRouter.delete("/todos/complete", deleteCompleteTodos);
todoRouter.delete("/todos", deleteAllTodos);
todoRouter.get("/todos", getAllTodos);
todoRouter.post("/todos", createTodo);

export default todoRouter;
