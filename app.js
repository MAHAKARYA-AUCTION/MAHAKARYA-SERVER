const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Mahakarya Server is Running" });
});

app.use("/", router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mahakarya Server is running on port ${port}.`);
});
