const SuperAdmin=require("../Models/SuperAdmin")
const Admin=require("../Models/Admin")
const _=require("lodash")
const bcrypt=require("bcryptjs")
const createAdmin= async(req,res)=>{
    const {fname,lname,email,password,country}=req.body

    let admin= await Admin.findOne({email})
    if(admin) return res.status(400).send("Account Already Exist")
    admin =new Admin({
    fname,
    lname,
    email,
    password,
    country
    })
    const salt= await bcrypt.genSalt(10)
    admin.password=await bcrypt.hash(admin.password,salt)
    await admin.save()

    res.send(_.pick(admin,['_id','fname','lname','email','country']))
}
const superadminSignIn=async (req,res)=>{
    const {email,password}=req.body
    let superadmin= await SuperAdmin.findOne({email})
    if(!superadmin) return res.status(400).send("Invalid Email or Password")
    let validPassword=await bcrypt.compare(password,superadmin.password)
    if(!validPassword)  return res.status(400).send("Invalid Email or Password")
    const token= superadmin.generateAuthtoken()
    res.send(token)
}

module.exports={createAdmin,superadminSignIn};