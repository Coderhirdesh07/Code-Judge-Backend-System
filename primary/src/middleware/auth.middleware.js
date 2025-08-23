const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

async function verifyJwt(request, response, next) {
  try {
    const token =
      request.cookies?.token || req.headers("AUTHORISATION")?.split("")[1];
    if (!token) response.status(400).json({ message: "Access Denied" });
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) response.status(400).json({ message: "User not found" });
    request.user = user;
    next();
  } catch (error) {
    console.log(error);
    return response(500).json({ message: "Invalid token or expired token" });
  }
}

module.exports = verifyJwt;
