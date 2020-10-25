const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StoriesSchema = new Schema({
    name:{type:String},
    date:{type:String, default:new Date().toLocaleDateString()},
    description:{type:String},
    story:{type:String},
    likes:{type:Number, default:0},
    comments:[]
})

module.exports= mongoose.model("Story", StoriesSchema);