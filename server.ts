import express from "express";
import cors from "cors";
import mongoose from "mongoose";
require("dotenv").config();
import usersRouter from "./routes/users";
import newsRouter from "./routes/news";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
    origin:
      process.env.NODE_ENV === "test"
        ? "http://localhost:3000"
        : (process.env.CLIENT as string),
  })
);
app.use(express.json());
app.use(cookieParser());

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Listen to port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
