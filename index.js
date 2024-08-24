const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConfig = require("./Config/db.config");
const keyConfig = require("dotenv");

// Configure Cors
const options = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(options));
app.disable("etag");

// Configure Static Folder
app.use(express.static("Public"));

// Middlewares
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use("/api/user", require("./Routes/User.Routes"));
app.use("/api/admin", require("./Routes/Admin.Routes"));
app.use("/api", require("./Routes/Open.Routes"));
app.use("/api/employee", require("./Routes/Employee.Routes"));
app.use("/api/rider", require("./Routes/Rider.Routes"));
app.use("/api/branchadmin", require("./Routes/BranchAdmin.Routes"));

// Configure JWT
keyConfig.config();

// Connection with database
mongoose
  .connect(
    `mongodb+srv://${dbConfig.USER}:${dbConfig.PASS}@mern.jsr5rzh.mongodb.net/${dbConfig.DATABASE}?retryWrites=true&w=majority`, 
  )
  .then((e) => {
    console.log("Connnected to Mongo DB Successfully!");
  })
  .catch((err) => {
    console.log("Cannot connect to Mongo DB!");
  });

// Port, listen for the requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}!`);
});
