const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/notes-db-app")
  .then((db) => console.log("db is connected"))
  .catch((err) => console.log("error", err));
