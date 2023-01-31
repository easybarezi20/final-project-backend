const express = require('express')
const router = express.Router()
const { User } = require("../models")

require("../config/db.connection");


router.get('/', (req,res,next) => {
    res.send('hello')
})

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
        const user = new User({
            email,
            password,
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
    .catch(error => {
        console.log(error);
    })
})

module.exports = router;