const jwt = require("jsonwebtoken");

let verifyuserloggedIn = (req, res, next) => {
  let token = req.headers["token"];
  console.log("token", token);
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send("unauthorized");
    } else {
      req.user = decoded;
      console.log(req.user);
      next();
    }
  });
};

module.exports = {
  verifyuserloggedIn,
};
