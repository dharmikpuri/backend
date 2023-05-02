const {Router}  =require("express")
const {PostModel}  =require("../model/post.model")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")
const postRoute = Router()

//Adding the post
postRoute.post("/add",async(req,res)=>{
try {
    const post = PostModel(req.body)
    await post.save();
    res.status(200).send({"msg":"Post Added Successfully"})
} catch (error) {
    res.status(400).send({"error":error.message})
}
})



//GET ALL THE POST DATA
postRoute.get("/",async(req,res)=>{
    try {
        const {device} = req.query
        const filterObj={}
        if(device){
            filterObj.device = device
        }
        const filteredData =await  PostModel.find(filterObj)
        res.status(200).send({"msg":"Getting data",filteredData})

    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})


//UPDATE LOGIC
postRoute.patch("/update/:id",async(req,res)=>{
    try {
        const post = await PostModel.findById(req.params.id)
        if(!post){
           res.statusCode(400).send({"msg":"Post not Found"})
        }
        if(post.userId !== req.body.userId){
            res.send({"msg":"You are not authorized"})
        }
        const updatePost = await PostModel.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).send({"msg":"Post updated"})
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})


//DELETE LOGIC
postRoute.delete("/delete/:id",async(req,res)=>{
    try {
        const post = await PostModel.findById(req.params.id)
        if(!post){
           res.statusCode(400).send({"msg":"Post not Found"})
        }
        if(post.userId !== req.body.userId){
            res.send({"msg":"You are not authorized"})
        }
        const updatePost = await PostModel.findByIdAndDelete(req.params.id)
        res.status(200).send({"msg":"Post Deleted"})
    } catch (error) {
        res.status(400).send({"error":error.message})
    }
})

module.exports = {postRoute}