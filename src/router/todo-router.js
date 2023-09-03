import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
} from "../controllers/todos-controller.js";

const todoRouter = express.Router();

todoRouter.get("/todos", getAllTodos);
todoRouter.post("/todos", createTodo);
todoRouter.delete("/todos/:id", deleteTodo);

export default todoRouter;
