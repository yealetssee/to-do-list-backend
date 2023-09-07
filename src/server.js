import express, { response } from "express";
import pool, { createTable } from "./config/sql.js";
import bodyParser from "body-parser";
import cors from "cors";
import todoRouter from "./router/todo-router.js";

const app = express();

const init = async () => {
  try {
    await createTable();
    startServer();
  } catch (error) {
    console.log(error);
  }

  function startServer() {
    app.use(bodyParser.json());
    app.use(
      cors({
        origin: "http://localhost:5173/",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      }),
    );

    app.use("/api", todoRouter);
    app.listen(3000);
  }
};

init();
