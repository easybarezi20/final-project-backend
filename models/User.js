const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    pic:{
        type: String,
        default:"https://res.cloudinary.com/dayu9uhsv/image/upload/v1675383655/guest-user_mn75c8.webp"
    },
    followers:[{type: ObjectId, ref:"User"}],
    following:[{type: ObjectId, ref:"User"}]
})

const User = mongoose.model("User", userSchema)
module.exports = User