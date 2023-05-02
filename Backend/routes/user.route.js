const {Router}  =require("express")
const {UserModel}  =require("../model/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRoute = Router()

//REGISTERING A NEW USER
userRoute.post("/register",async(req,res)=>{
try {
    const {name,email,gender,password} = req.body
    const user = await UserModel.findOne({email})
    if(user){
        res.send({"msg":"User already exist Please Login "})
    }else{
        bcrypt.hash(password, 8, async(err, hash)=>{
            const user = UserModel({name,email,password:hash,gender})
            await user.save();
            res.status(200).send("User Registered Successfully")
        });
    }
} catch (error) {
    res.send({"error":error.message})
}
})



//LOGIN A USER
userRoute.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await UserModel.findOne({email})
       if(user){
        bcrypt.compare(password, user.password, (err, result)=> {
            if(result){
                const token = jwt.sign({userId: user._id},process.env.SECURITY_KEY);
                res.send({"msg":"Login Successfull",token:token})
            }else{
                res.status(400).send({'msg':"Wrong Credentials!"})
            }
        });
       }
    } catch (error) {
        res.send({"error":error.message})
    }
})




module.exports = {userRoute}