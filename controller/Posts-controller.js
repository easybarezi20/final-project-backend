const express = require("express");
const router = express.Router();
const { Posts } = require("../models")
const requireLogin = require('../middleware/requireLogin')

require("../config/db.connection");

//localhost:4000/posts/allpost
router.get('/allpost',requireLogin, (req, res) => {
    Posts.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts => {
        res.json({posts})
    })
    .catch(err =>{
        console.log(err);
    })
})
router.get('/getfollowpost',requireLogin, (req, res) => {
    Posts.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts => {
        res.json({posts})
    })
    .catch(err =>{
        console.log(err);
    })
})

//localhost:4000/posts/createpost
router.post("/createpost", requireLogin, (req, res, next) => {
   const { title , body, photo } = req.body
   console.log(title, body, photo)
   if(!title || !body || !photo){
    return res.status(422).json({error:"please add all the fields"})
   }
   req.user.password = undefined
   const post = new Posts({
    title,
    body,
    photo,
    postedBy:req.user
   })
   post.save().then(result => {
    res.json({post:result})
   })
   .catch(err => {
    console.log(err);
   })
})

//localhost:4000/posts/mypost
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
//localhost:4000/posts/like
router.put('/like', requireLogin, (req, res) => {
    Posts.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .exec((err, result) => {
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
//localhost:4000/posts/unlike
router.put('/unlike', requireLogin, (req, res) => {
    Posts.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .exec((err, result) => {
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
//localhost:4000/posts/comment
router.put('/comment', requireLogin, (req, res) => {
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Posts.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .exec((err, result) => {
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId', requireLogin,(req,res) =>{
    Posts.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post) =>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result => {
                res.json({result})
            }).catch(err =>{
                console.log(err);
            })
        }
    })
})









module.exports = router;