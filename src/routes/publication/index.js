const express = require('express')
const { verifyToken } = require('../../middleware/auth')
const router = new express.Router()
const { createPublication,getAllPublications} = require('./utils')

router.post('/publication/create',verifyToken, async (req,res)=>{
    try{
        const request= req.body
        const publication= await createPublication(
            request.title,
            request.creatorNickname,
            request.body,
            request.imageUrl,
        )
        res.status(200).send(
            {
                status:true,
                message:"publication creation Done",
                data:{
                    publication:publication
                }
            }
        )
    }catch(error){
        res.status(500).send(
            {
                status:false,
                message:"group creation failed",
                data:{
                    message:error.toString()
                }
            }
        )
    }     
})

router.get("/publication/all",verifyToken,async(req,res)=>{
    try {

        const publications = await getAllPublications()

        res.status(200).send({
            status: true,
            message: "publications successfully obtained",
            data: {publications:publications}
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Get publications failed",
            data: { error: error.toString() }
        })
    }
})

module.exports=router