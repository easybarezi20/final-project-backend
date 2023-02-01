const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env;
const { User } = require("../models")
const requireLogin = require('../middleware/requireLogin')

require("../config/db.connection");


router.get('/', (req,res,next) => {
    res.send('hello')
})

router.get('/protected', requireLogin, (req, res) => {
    res.send("hello user")
})




//localhost:4000/user/signup
router.post("/signup", (req, res) => {
    const { name, email, password} = req.body
    if(!email || !password || !name){
       return res.status(422).json({error: "please add all the fields"})
    }
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(422).json({error: "user already exists with that email"})
        }
        bcrypt.hash(password, 12)
        .then(hashedpassword => {
            const user = new User({
                email,
                password: hashedpassword,
                name
            })
    
            user.save()
            .then(user => {
                res.json({message: "saved successfully"})
            })
            .catch(error => {
                console.log(error);
            })
        })
    })
    .catch(error => {
        console.log(error);
    })
})
//localhost:4000/user/signin
router.post('/signin', (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
           return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch){
                // res.json({message: "successfully signed in"})
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                res.json({token})
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err => {
            console.log(err);
        })
    })
})

module.exports = router;