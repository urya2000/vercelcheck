const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Router");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello Surya");
});

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://suryaprakashmessi99:EM5VG2DlE3nNyHSf@cluster0.wacflvo.mongodb.net/crudMern",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database connection success"))
  .catch((err) => console.log("Database connection error: " + err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
