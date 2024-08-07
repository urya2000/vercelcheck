const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = 7000;
const router = require("./Router");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

//mongoose db connection
mongoose
  .connect(
    "mongodb+srv://suryaprakashmessi99:EM5VG2DlE3nNyHSf@cluster0.wacflvo.mongodb.net/crudMern"
  )
  .then(() => console.log("database connection success"))
  .catch((err) => console.log("db not connected :" + err));

app.listen(PORT, () => {
  console.log(`the port is running on ${PORT}`);
});
