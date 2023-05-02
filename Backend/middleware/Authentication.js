const jwt = require("jsonwebtoken")
const Authentication = (req,res,next)=>{
const token = req.headers.authorization
if(token){
    const decoded  = jwt.verify(token,process.env.SECURITY_KEY);
    if(decoded){
        req.body.userId = decoded.userId
        next()
    }else{
        res.status(400).send({"msg":"Please Login First !!"})
    }
}else{
    res.status(400).send({"msg":"Please Login First !!"})
}
}


module.exports  ={Authentication}