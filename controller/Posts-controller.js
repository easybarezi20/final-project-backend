const express = require("express");
const router = express.Router();
const { Posts } = require("../models")


require("../config/db.connection");

router.get("/", async (req, res, next) => {
    try {
        const post = await Posts.find({});
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.post("/", async (req, res, next) => {
    try {
        const createdPost = await Posts.create(req.body);
        res.status(201).json(createdPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
})



















module.exports = router;