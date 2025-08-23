const express = require("express");
const router = express.Router();
const {
  handleUserLoginRoute,
  handleUserLogoutRoute,
  handleUserRegisterRoute
} = require("../controllers/user.controller.js");
const verifyJwt = require("../middleware/auth.middleware.js");

// user registration routes
router.post("/register", handleUserRegisterRoute);
// protected route
router.post("/login", verifyJwt, handleUserLoginRoute);
router.post("/logout", verifyJwt, handleUserLogoutRoute);

module.exports = router;
