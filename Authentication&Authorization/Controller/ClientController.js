const Client=require("../Models/Client")
const Freelancer=require("../Models/Freelancer")
const _=require("lodash")
const bcrypt=require("bcryptjs")
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

module.exports={clientSignup,clientSignIn};