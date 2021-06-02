const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors())
// app.use(express.json())

const uri = process.env.ATLAS_URI;
// https://arunrajeevan.medium.com/understanding-mongoose-connection-options-2b6e73d96de1
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
