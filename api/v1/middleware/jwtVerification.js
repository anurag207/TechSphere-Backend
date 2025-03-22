const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const { cookies } = req;
  const { token } = cookies || {};
  // console.log(token);
  if (!token) {
    res.status(401).json({
      status: "fail",
      message: "Please Login",
    });
  } else {
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async (err, userData) => {
        if (err) {
          res.status(401).json({
            status: "fail",
            message: "Invalid Token..Please Login!",
          });
          return;
        }
        req.userInfo=userData; //request is an object, adding userData as key value pair to the object
       //decoded info from callback (token)
        next();
      }
    );
  }
};

module.exports= {verifyToken};