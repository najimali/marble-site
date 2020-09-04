let mongoose = require("mongoose");
//Schema Setup
let commentSchema = new mongoose.Schema({
    //connecting Comments with user
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    text:String,
});
//Creatiing Campground Coolections & compiling the schmema into
module.exports =mongoose.model("Comment",commentSchema); 