const express = require('express');
const router = express.Router();
const {
  handleGetProblemRoute,
  handleSubmitProblemRoute,
  handleRunProblemRoute,
} = require('../controllers/problem.controller.js');
const verifyJwt = require('../middleware/auth.middleware.js');

router.get('/:id', verifyJwt, handleGetProblemRoute);
router.get('/:id/run', verifyJwt, handleRunProblemRoute);
router.get('/:id/submit', verifyJwt, handleSubmitProblemRoute);

module.exports = router;
