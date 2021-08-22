import express from "express";
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();
import usersRouter from "./routes/users";
import newsRouter from "./routes/news";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT,
  })
);
app.use(express.json());

// Connect to DB
const uri = process.env.ATLAS_URI;
// https://arunrajeevan.medium.com/understanding-mongoose-connection-options-2b6e73d96de1
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const conn = mongoose.connection;
conn.on("error", (err) => console.log(err));
conn.once("open", () => console.log("Connected to database"));

// User Routes
app.use("/users", usersRouter);

// News Route
app.use("/news", newsRouter);

// Listen to port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
