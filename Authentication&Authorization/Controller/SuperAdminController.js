const SuperAdmin=require("../Models/SuperAdmin")
const Admin=require("../Models/Admin")
const _=require("lodash")
const bcrypt=require("bcryptjs")
const createAdmin = async (req, res) => {
    try {
      const { fname, lname, email, password, country } = req.body;
  
      // Check if the email is already registered
      let admin = await Admin.findOne({ email });
      if (admin) {
        return res.status(400).send("Account Already Exists");
      }
  
      // Create a new Admin
      admin = new Admin({
        fname,
        lname,
        email,
        password,
        country
      });
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(admin.password, salt);
  
      // Save the Admin to the database
      await admin.save();
  
      // Respond with the new Admin details
      res.send(_.pick(admin, ['_id', 'fname', 'lname', 'email', 'country']));
    } catch (error) {
      console.error(error);
      res.status(500).send('Failed to create Admin');
    }
  };
const superadminSignIn=async (req,res)=>{
    const {email,password}=req.body
    let superadmin= await SuperAdmin.findOne({email})
    if(!superadmin) return res.status(400).send("Invalid Email or Password")
    let validPassword=await bcrypt.compare(password,superadmin.password)
    if(!validPassword)  return res.status(400).send("Invalid Email or Password")
    const token= superadmin.generateAuthtoken()
    res.send(token)
}
const createSuperAdmin = async (req, res) => {
    try {
      const { fname, lname, email, password,country } = req.body;
  
      // Check if the email is already registered
      const existingSuperAdmin = await SuperAdmin.findOne({ email });
      if (existingSuperAdmin) {
        return res.status(400).json({ error: 'Email is already registered' });
      }
  
      // Create a new SuperAdmin
      const newSuperAdmin = new SuperAdmin({
        fname,
        lname,
        email,
        password,
        country,
      });
      const salt= await bcrypt.genSalt(10)
      newSuperAdmin.password=await bcrypt.hash(newSuperAdmin.password,salt)
      // Save the SuperAdmin to the database
      await newSuperAdmin.save();
      res.send(_.pick(newSuperAdmin,["_id","fname","lname","email","country"]))
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create SuperAdmin' });
    }
  };
  
  module.exports = createSuperAdmin;
  
module.exports={createAdmin,superadminSignIn,createSuperAdmin};