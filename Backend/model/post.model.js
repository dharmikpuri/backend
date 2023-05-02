const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:{type:String,require:true},
body:{type:String,require:true},
device:{type:String,enum:["PC","TABLET","MOBILE"],require:true},
userId:{type:String,require:true}
},{versionKey:false})


const PostModel = mongoose.model("post_collection",postSchema)

module.exports = {PostModel}