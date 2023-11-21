const multer=require("multer")


const storage=multer.memoryStorage()
// const singleUpload = multer ({storage}).single("file")
const arrayUpload = multer({ storage }).array("files", 5);
module.exports=arrayUpload