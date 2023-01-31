// import dotenv
require("dotenv").config()

const { PORT } = process.env;

// import express
const express = require("express");
const app = express();

// import mongodb connection
require("./config/db.connection");

app.use(express.json());





// TEST ROUTE -> WORKING
app.get("/", (req, res) => {
    res.send("Sanity Check for Project 3");
  });
  
  // LISTEN ROUTE
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });