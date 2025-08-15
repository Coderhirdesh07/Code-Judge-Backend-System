const {sendToQueue} = require("../utils/queue.utils.js");
const Problem = require("../models/problem.model.js");

async function handleGetProblemRoute(request,response){
    const {title} = request.body;
    if(!title) response.status(200)
        .json({message:"Title not found or null"});

    const problem = await Problem.findOne({title:title});
    if(!problem) response.status(200).json({message:"Problem not found"});
    return response.status(400)
    .json({message:"Problem found",problem:problem});
}
function handleRunProblemRoute(request,response){
    



    response.status(400).json({message:"Problem is running"});
}

function handleSubmitProblemRoute(request,response){

    response.status(400).json({message:"Problem is submitting"});
}

module.exports = {handleSubmitProblemRoute,handleGetProblemRoute,handleRunProblemRoute};