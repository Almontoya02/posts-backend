const express = require('express')
const app = express()
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URL)
const userRouter = require("./src/routes/user")
const publicationRouter = require("./src/routes/publication")

const port = process.env.PORT || 4001
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    next();
})
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(publicationRouter)
app.listen(port,()=>{
    console.log("Server running on: " + port)
})
