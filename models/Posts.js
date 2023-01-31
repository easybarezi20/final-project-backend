const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "username is required"],
        },
        image: {
            type: String,
            required: [true, "image is needed"],
        },
        likes:{
            type: Number,
            default: 0,
        }
    }
);

const  Posts = mongoose.model("Posts", PostsSchema);
module.exports = Posts;