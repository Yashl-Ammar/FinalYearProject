const Freelancer=require("../Models/Freelancer")
const _=require("lodash")
const bcrypt=require("bcryptjs")
const freelancerSignup= async(req,res)=>{
    const{fname,lname,email,password,country}=req.body

    let freelancer= await Freelancer.findOne({email})
    if(freelancer) return res.status(400).send("Account Already Exists")

    freelancer = new Freelancer({
        fname,
        lname,
        email,
        password,
        country
    }) 
    const salt= await bcrypt.genSalt(10)
    freelancer.password=await bcrypt.hash(freelancer.password,salt)
    await freelancer.save()
    res.send(_.pick(freelancer,["_id","fname","lname","email","country"]))
}
const freelancerSignin=async (req,res)=>{
    const {email,password,rememberMe}=req.body
    let freelancer= await Freelancer.findOne({email})
    if(!freelancer) return res.status(400).send("Invalid Email or Password")

    let validPassword=await bcrypt.compare(password,freelancer.password)
    if(!validPassword)  return res.status(400).send("Invalid Email or Password")
    const token= freelancer.generateAuthtoken(rememberMe)
    res.send(token)
}
module.exports={freelancerSignup,freelancerSignin};