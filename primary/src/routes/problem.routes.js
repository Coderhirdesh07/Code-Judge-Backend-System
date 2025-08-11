const express = require('express');
const router = express.Router();
const {handleGetProblemRoute,
    handleSubmitProblemRoute,
    handleRunProblemRoute} = require('../controllers/problem.controller.js');



router.get('/problem/:id',handleGetProblemRoute);
router.get('/problem/:id/run',handleRunProblemRoute);
router.get('/problem/:id/submit',handleSubmitProblemRoute);

module.exports = router;