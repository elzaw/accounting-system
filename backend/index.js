const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Importing routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(
    `Accounting System app listening in ${process.env.NODE_ENV} on port ${PORT}!`
  );
});
