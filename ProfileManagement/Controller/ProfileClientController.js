const Client=require('../Models/Client')
const getDataUri = require("../utils/dataUri");
const cloudinary=require("../utils/cloudinary")
const getClientData=async(req,res)=>{
    const id=req.user._id
    let client= await Client.findById(id)
    if(!client) return res.status(404).send("Clientr Not found")
    res.send(client)
}
const clientEditProfile=async(req,res)=>{
    const id=req.user._id
    const{languages,fname,lname}=req.body
    const profilepic=req.file;
    console.log(req.files)
    let client= await Client.findById(id)
    if(!client) return res.status(404).send("Client Not found")
    const fileUri=getDataUri(profilepic)
    const mycloud= await cloudinary.uploader.upload(fileUri.content)  

    client.fname=fname
    client.lname=lname
    client.languages=languages
    client.profilepic=mycloud.secure_url

    client.save()
    res.send(client)
}
module.exports={clientEditProfile,getClientData}