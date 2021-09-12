const express = require('express');
const bodyParser = require("body-parser");

const Routes = require("./routers");

const app = express();

app.use(bodyParser.json());

//headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',"*"); //Allows which domains are avalible to access our resources
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS"); //Which http words can be used
  next();
});

app.use("/api/users", Routes);

module.exports = app;