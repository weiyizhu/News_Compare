const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const usersRouter = require("./routes/users");

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors())
app.use(express.json())

// Connect to DB
const uri = process.env.ATLAS_URI;
// https://arunrajeevan.medium.com/understanding-mongoose-connection-options-2b6e73d96de1
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;
conn.on("error", (err) => console.log(err));
conn.once("open", () => console.log("Connected to database"));

// User Routes
app.use("/users", usersRouter);

// Listen to port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
