const multer=require("multer")

// const storage=multer.diskStorage({
//     filename: function(req,file,cb){
//         cb(null,file.originalname)
//     }
// })
const storage=multer.memoryStorage()
const singleUpload = multer ({storage}).single("file")

// const upload=multer({storage:storage})
module.exports=singleUpload