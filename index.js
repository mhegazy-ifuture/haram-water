import express from "express";
import path from "path";
import { config } from "dotenv";
import bootstrap from "./src/bootstrap.js";
config({ path: path.resolve("./config/config.env") });

const app = express();
const port = process.env.PORT || 3000;

bootstrap(app, express);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
