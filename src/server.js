import express, { response } from "express";
import pool, { createTable } from "./config/sql.js";
import bodyParser from "body-parser";

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

    app.get("/api/todos", async (_, response) => {
      try {
        const resultQuery = await pool.query("SELECT * FROM todos");

        const rows = resultQuery.rows;

        return response.status(200).json(rows);
      } catch (error) {
        return response.status(401).json(error);
      }
    });

    app.post("/api/todos", async (req, res) => {
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
    });
    app.listen(3000);
  }
};

init();
