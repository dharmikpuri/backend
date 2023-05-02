const express = require("express")
const app = express()
const cors = require("cors")
const {connection}  = require("./config/db")



const {userRoute}  = require("./routes/user.route")

const {postRoute}  = require("./routes/post.route")

const {Authentication}  = require('./middleware/Authentication')

app.use(express.json())
app.use(cors())
app.use("/users",userRoute)


app.use(Authentication)


app.use("/posts",postRoute)

app.listen(process.env.PORT,async()=>{
    try {


        await connection
       console.log("Connection established successfully")

       console.log("I am working fine at PORT 8081")
    } catch (error) {



        
        console.log({"error":error.message})
    }
})