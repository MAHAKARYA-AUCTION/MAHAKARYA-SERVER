const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Mahakarya Server is Running" });
});

app.use("/", router);

app.use(errorHandler);

module.exports = app;
