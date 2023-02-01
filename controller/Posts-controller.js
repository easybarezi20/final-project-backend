const express = require("express");
const router = express.Router();
const { Posts } = require("../models")
const requireLogin = require('../middleware/requireLogin')

require("../config/db.connection");

//localhost:4000/posts/allpost
router.get('/allpost', (req, res) => {
    Posts.find()
    .populate("postedBy","_id name")
    .then(posts => {
        res.json({posts})
    })
    .catch(err =>{
        console.log(err);
    })
})

//localhost:4000/posts/createpost
router.post("/createpost", requireLogin, (req, res, next) => {
   const { title , body } = req.body
   if(!title || !body){
    return res.status(422).json({error:"please add all the fields"})
   }
   req.user.password = undefined
   const post = new Posts({
    title,
    body,
    postedBy:req.user
   })
   post.save().then(result => {
    res.json({post:result})
   })
   .catch(err => {
    console.log(err);
   })
})

//localhost:4000/posts/allpost
router.get('/mypost', requireLogin, (req, res) => {
    Posts.find({postedBy:req.user._id})
    .populate("postedBy", "_id name")
    .then(mypost => {
        res.json({mypost})
    })
    .catch(err =>{
        console.log(err);
    })
})













module.exports = router;