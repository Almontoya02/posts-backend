const mongoose = require("mongoose")

const publicationSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    creatorNickname:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    body:{
        type:String,
        required:true,
        trim:true
    },
    imageUrl:{
        type:String,
        trim:true,
    }

})



const Publication = mongoose.model("Publication", publicationSchema)
module.exports=Publication