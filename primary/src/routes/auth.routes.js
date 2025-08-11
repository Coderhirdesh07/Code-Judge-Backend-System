const express = require('express');
const router = express.Router();
const {handleUserLoginRoute,
    handleUserLogoutRoute,
    handleUserRegisterRoute} = require('../controllers/user.controller.js');

// user registration routes
router.post('/register',handleUserRegisterRoute);
// protected route
router.post('/login',handleUserLoginRoute);
router.post('/logout',handleUserLogoutRoute);


module.exports = router;
