const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User =require("../../models/user")


async function registerUser(email,nickname,password){
    try{
        const hashedPassword= await hashPassword(password)
        const token = createToken(email,nickname)
        const user= await User.create({
            email,
            nickname,
            password:hashedPassword,
            token
        }).catch((error)=>{
            console.log("Error",error)
            throw new Error('Error to register'+error )
        })
    
        return {email,nickname,token}
    }catch(error){
        throw new Error('Enter valid information: '+ error)
    }
}

async function loginUser(email,password){
    
    const user = await User.findOne({email}).catch((error)=>{
        throw new Error("User not found")
    })
    if(user==null){
        throw new Error("User not found")
    }
    const match = await verifyPassword(password,user.password)
    if(match===false){
        throw new Error("Incorrect Password")
    }
    const token = createToken(email,user.nickname)
    user.token=token
    await user.save().catch((error)=>{
        throw new Error("Save new token failed")
    })
    return {email,nickname:user.nickname,token,imageUrl:user.imageUrl}

}
async function hashPassword(password){
    return await bcrypt.hash(password,5)
}
async function verifyPassword(password,inputpassword){
    return await bcrypt.compare(password,inputpassword)
    
}

function createToken(email,nickname){
    const token = jwt.sign({email,nickname},process.env.AUTH_PASSWORD)
    return token
}

module.exports={registerUser,loginUser}