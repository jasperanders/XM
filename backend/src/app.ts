import express, { Application, Request, Response } from "express";
// import { db } from "./models/database";
import mongoose from "mongoose";

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.listen(5000, () => {
  console.log("server running");
});

mongoose.connect("mongodb://localhost/xm", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("connected to db");
});
console.log(db);
