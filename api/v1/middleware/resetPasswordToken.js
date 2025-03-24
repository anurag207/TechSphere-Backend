const jwt = require("jsonwebtoken");

const resetPasswordVerifyToken = (req, res, next) => {
  const { cookies } = req;
  const authHeader = req.headers.authorization;
  
  // Extract token from cookies or Authorization header
  let token = cookies?.reset_pasword_token || (authHeader && authHeader.split(" ")[1]);

  console.log("Extracted Token:", token);

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Please Login",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY_RESET_PASSWORD, async (err, userData) => {
    if (err) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid Token..Please Login!",
      });
    }

    req.userInfo = userData; // Attach user data to request
    next();
  });
};

module.exports = { resetPasswordVerifyToken };
