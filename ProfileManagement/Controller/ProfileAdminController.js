const Admin=require('../Models/Admin')

const adminEditProfile=async(req,res)=>{
    const id=req.user._id
    const{country,fname,lname}=req.body
    let admin= await Admin.findById(id)
    if(!admin) return res.status(404).send("Admin Not found")
    admin.fname=fname
    admin.lname=lname
    admin.country=country


    admin.save()
    res.send(admin)
}
const getAdminData=async(req,res)=>{
    const id=req.user._id
    let admin= await Admin.findById(id)
    if(!admin) return res.status(404).send("Admin Not found")
    res.send(admin)
}

module.exports={adminEditProfile,getAdminData}