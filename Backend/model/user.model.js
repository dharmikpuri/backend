const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {type:String,require:true},
email : {type:String,require:true},
gender : {type:String,require:true},
password : {type:String,require:true},
},{versonKey:false})


const UserModel = mongoose.model("user_collection",userSchema)

module.exports = {UserModel}