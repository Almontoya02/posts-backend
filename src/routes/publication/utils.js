const Publication =require("../../models/publication")
const User =require("../../models/user")
const moment = require ("moment")

async function createPublication(title,creatorNickname,body,imageUrl){

    const publication= await Publication.create({
        title,
        creatorNickname,
        date:moment().unix(),
        body,
        imageUrl

    }).catch((error)=>{
        console.log("Error",error)
        throw new Error('Register Failed')
    })
    return {creatorNickname:publication.creatorNickname,date:publication.date,body:publication.body,imageUrl:publication.imageUrl}
}

async function getAllPublications(){
    const publications= await Publication.find({}).sort({date:-1}).catch((error)=>{
        console.log("Error",error)
        throw new Error('Groups not found')
    })
    if(publications==null || publications.length <=0 ){
        throw new Error('is not there publications')
    }
    return publications
    
}

module.exports={createPublication,getAllPublications}