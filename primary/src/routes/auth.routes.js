const express = require('express');
const router = express.Router();

// user registration routes
router.post('/register',handleUserRegisterRoute);
router.post('/signin',handleUserSignInRoute);
router.post('/logout',handleUserLogoutRoute);

