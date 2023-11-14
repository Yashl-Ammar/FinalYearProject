const Admin=require("../Models/Admin")
const _=require("lodash")
const bcrypt=require("bcryptjs")
const adminSignIn=async (req,res)=>{
    const {email,password}=req.body
    let admin= await Admin.findOne({email})
    if(!admin) return res.status(400).send("Invalid Email or Password")
    let validPassword=await bcrypt.compare(password,admin.password)
    if(!validPassword)  return res.status(400).send("Invalid Email or Password")
    const token= admin.generateAuthtoken()
    res.send(token)
}

module.exports=adminSignIn;