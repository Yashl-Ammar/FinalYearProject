module.exports =function(req,res,next){

    if(req.user.role!=="freelancer") return res.status(403).send("Access Denied")
    next()
}