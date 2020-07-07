import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017", { useNewUrlParser: true });

export const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
});
