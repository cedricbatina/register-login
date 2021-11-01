const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const userRoute = require("./routes/user.route");

const corsOptions = {
  origin: "http://localhost:8080",
};

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRoute);

module.exports = app;
