const Client=require("../Models/Client")
const cloudinary=require("../utils/cloudinary")
const _=require("lodash")
const bcrypt=require("bcryptjs")
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/dataUri");
const clientSignup= async(req,res)=>{
    const {fname,lname,email,password,country}=req.body

    let client= await Client.findOne({email})
    if(client) return res.status(400).send("Account Already Exist")
    client =new Client({
    fname,
    lname,
    email,
    password,
    country
    })
    const salt= await bcrypt.genSalt(10)
    client.password=await bcrypt.hash(client.password,salt)
    await client.save()

    res.send(_.pick(client,['_id','fname','lname','email','country']))
}
const clientSignIn=async (req,res)=>{
    const {email,password,rememberMe}=req.body
    let client= await Client.findOne({email})

    if(!client) return res.status(400).send("Invalid Email or Password")
        
    
    let validPassword=await bcrypt.compare(password,client.password)
    if(!validPassword)  return res.status(400).send("Invalid Email or Password")
    const token= client.generateAuthtoken(rememberMe)
    res.send(token)
}
const editProfile=async(req,res)=>{
    let token = req.headers["token"];
    if(!token) return res.status(401).send("Access denied. No token provided.")
  
      const decoded=jwt.verify(token,process.env.SECRET_KEY)
      req.user=decoded
      id =req.user._id
      const{username,languages}=req.body
      const profilepic=req.file;
      let client= await Client.findById(id)
      if(!client) return res.status(404).send("Client Not found")
      const fileUri=getDataUri(profilepic)
      const mycloud= await cloudinary.uploader.upload(fileUri.content)  
        
      client.username=username
      client.languages=languages
      client.profilepic=mycloud.secure_url

      client.save()

      res.send(client)

    
}

module.exports={clientSignup,clientSignIn,editProfile};