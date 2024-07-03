const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
require('dotenv').config()

const userRouter = require("./routes/users");
const datasetRouter = require("./routes/datasets");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const allowedOrigins = [process.env.FRONTEND_URL, "https://cron-job.org"];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || origin == undefined) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

const server = http.createServer(app);

app.use("/images", express.static("uploads"));

app.use("/api/users", userRouter);
app.use("/api/datasets", datasetRouter);


app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
    data: {
      message: "Welcome to the Municonnect API",
    },
  });
});


app.all("*", (req, res, next) => {
  res.status(404).json({
    message: "fail",
    data: {
      message: "Page not found",
    },
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mongoDB");
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;