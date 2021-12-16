const express = require('express')
const router = new express.Router()
const { registerUser,loginUser,getOneUser,updateImg} = require('./utils')

router.post("/user/register", async(req,res)=>{
    try{
        const request= req.body
        const user= await registerUser(request.email,request.nickname,request.password)
        res.status(200).send(
            {
                status:true,
                message:"Register Done",
                data:{
                    email:user.email,
                    nickname:user.nickname,
                    token:user.token
                }
            }
        )
    }catch(error){
        res.status(200).send(
            {
                status:false,
                message:"Register Failed",
                data:{
                    message:error.toString()
                }
            }
        )
    }

})


router.post("/user/login", async(req,res)=>{
    try{
        const request = req.body
        const userLogin = await loginUser(request.email,request.password)

        res.status(200).send(
            {
                status:true,
                message:"Login Done",
                data:{
                    email:userLogin.email,
                    nickname:userLogin.nickname,
                    token:userLogin.token,
                    imageUrl:userLogin.imageUrl
                }
            }
        )
    }catch(error){
        console.log(error)
        res.status(200).send(    {
            data:{error:error.toString()},
            status:false,
            message:"Error" 
        })
    }
})

router.patch("/user/update",async(req,res)=>{
    try{
        const request = req.body
        const user = await updateImg(
            request.nickname,
            request.imageUrl

        )
        res.status(200).send({
            status: true,
            message: "Actualizado con éxito",
            data: {user}
        })
    }catch(error){
        res.status(500).send({
            status: false,
            message: "Update failed",
            data: { error: error.toString() }
        })
    }
})

router.get("/user/:userNickname",async(req,res)=>{
    try{
        const request = req.body
        const params = req.params
        const user = await getOneUser(
            params.userNickname

        )
        res.status(200).send({
            status: true,
            message: "Usuario obtenido con éxito",
            data: {user}
        })
    }catch(error){
        res.status(500).send({
            status: false,
            message: "Get failed",
            data: { error: error.toString() }
        })
    }
})


module.exports=router