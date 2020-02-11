const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./api/routes/usersRoutes");
const announceRoutes = require("./api/routes/announceRoutes");
const adminRoutes = require("./api/routes/adminRoutes");
const serviceRoutes = require("./api/routes/serviceRoutes");
const uploadRoutes = require("./api/routes/uploadRoutes"); 
const billRoutes = require("./api/routes/billRoutes");

mongoose.connect(
  "mongodb://jpm-db/jpmDB",
  function(err) {
    if (err) throw err;
    console.log("conect to mongoDB Atlast Success Full");
  }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Method", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }

  next();
});

app.use(express.static("uploads"));
app.use("/users", userRoutes);
app.use("/announce", announceRoutes);
app.use("/admin", adminRoutes);
app.use("/service", serviceRoutes);
app.use("/upload", uploadRoutes);
app.use("/bill",billRoutes);


app.use("/healty", (req, res, next) => {
  res.status(200).send("server is healty");
});
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: { message: error.message }
  });
});

module.exports = app;
