const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public");
    },
    filename: function (req, file, cb) {
      let filePath = Date.now() + "-" + file.originalname;
      cb(null, filePath);
      if (!req.body.file) {
        req.body.file = [];
      }
      req.body.file.push(filePath);
    },
  }),
}).array("file", 50);

module.exports = upload;
