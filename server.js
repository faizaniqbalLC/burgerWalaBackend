import app from "./app.js";

import { connectDb } from "./config/database.js";
connectDb();

app.get("/", (req, res, next) => {
  res.send("<h1>working fine</h1>");
});

app.listen(process.env.PORT, () => {
  console.log("server run");
});
