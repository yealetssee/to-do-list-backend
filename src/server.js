import express from "express";
import { createTable } from "./config/sql.js";

const app = express();

const init = async () => {
  try {
    await createTable();
    startServer();
  } catch (error) {
    console.log(error);
  }

  function startServer() {
    app.get("/", (_, response) => {
      return response.status(200).json({ message: "working" });
    });
    app.listen(3000);
  }
};

init();
