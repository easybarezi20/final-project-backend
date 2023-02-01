const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types

const PostsSchema = new mongoose.Schema(
    {
       title:{
        type: String,
        required: true,
       },
       body:{
        type: String,
        required: true,
       },
       photo:{
        type: String,
        default:"no photo"
       },
       postedBy:{
        type: ObjectId,
        ref: "User"
       }
    }
);

const  Posts = mongoose.model("Posts", PostsSchema);
module.exports = Posts;