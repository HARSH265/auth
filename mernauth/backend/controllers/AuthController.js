const UserModel=require('../models/userModel')
const jwt=require('jsonwebtoken')
const bcrypt= require('bcrypt')

const signup =async (req,res) =>{
    try{
const {name, email,password}=req.body
const user =await UserModel.findOne({email})
if(user){
    return res.status(409).json({message:'user already exists,you can log in'})
}
const userModel=new UserModel({name,email,password});
userModel.password= await bcrypt.hash(password,10);
await userModel.save();
res.status(201).json({
    message:"Signup successfully",
    success:true
})
    }catch(err){
console.log(err)
res.status(500).json({
    message:"internal server error",
    success:false
})
    }
} 

const login =async (req,res) =>{
    try{
const { email,password}=req.body
const user =await UserModel.findOne({email})
if(!user){
    return res.status(403).json({message:'email and password is wrong'})
}
const ispasswordEqual= await bcrypt.compare(password,user.password)
if(!ispasswordEqual){
    return res.status(403).json({
        message:'email and passsword is wrong',
    success :false
    })
}
const jwtToken= jwt.sign({email:user.email, _id:user._id},
    process.env.JWT_SECRET,
    {expiresIn:'24h'}
)

res.status(200).json({
    message:"Login successfully",
    success:true,
    jwtToken,
    email,
    name:user.name
})
    }catch(err){
console.log(err)
res.status(500).json({
    message:"internal server error",
    success:false
})
    }
} 

module.exports ={signup,login}