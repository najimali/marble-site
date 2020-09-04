let mongoose = require("mongoose");
//Schema Setup
let campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description:String,

    //Associating Campground with user
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    //Associating Campground with comments
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
});
//Creatiing Campground Coolections & compiling the schmema into a model
module.exports =mongoose.model("Campground",campgroundSchema); 