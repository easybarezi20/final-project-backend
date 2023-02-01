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
const { authController } = require("./controller")

// middleware
const customMiddleware = (req,res,next) => {
  console.log("middleware executed!!");
  next()
}
app.use(customMiddleware)
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); // app.use(express.json()) MUST GO BEFORE THE CONTROLLERS
app.use(express.urlencoded({ extended: true }));
app.use("/user", authController);
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