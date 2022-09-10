import express, { Express } from "express";
import Routes from "./router/index.router";

import { config } from "dotenv";

config();

const app: Express = express();

app.use(express.json());

const port = process.env.PORT;

console.log("Accessing...");
app.use("/", Routes);

app.listen(port, () => {
  console.log(`Listen on port http://localhost:${port}`);
});
