// import dotenv
require("dotenv").config()

const { PORT } = process.env;

// import express
const express = require("express");
const app = express();

// import mongodb connection
require("./config/db.connection");

app.use(express.json());

// IMPORT MORGAN AND CORS
const cors = require("cors");
const morgan = require("morgan");

//import controllers
const { postsController } = require("./controller")

// middleware
app.use("/posts", postsController);
app.use((err, req, res, next) => res.status(500).send(err));




// TEST ROUTE -> WORKING
app.get("/", (req, res) => {
    res.send("Sanity Check for Project 4");
  });
  
  // LISTEN ROUTE
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });