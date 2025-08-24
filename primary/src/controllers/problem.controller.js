const { sendToQueue } = require('../utils/queue.utils.js');
const Problem = require('../models/problem.model.js');

async function handleGetProblemRoute(request, response) {
  const { title } = request.body;
  if (!title)
    return response.status(200).json({ message: 'Title not found or null' });

  const problem = await Problem.findOne({ title: title });
  if (!problem) response.status(400).json({ message: 'Problem not found' });
  return response
    .status(200)
    .json({ message: 'Problem found', problem: problem });
}
async function handleRunProblemRoute(request, response) {
  const { _id, code, language } = request.body;
  if (_id == null || code == null || language == null) {
    return response
      .status(400)
      .json({ message: 'Problem id or code or language is null' });
  }
  const contructedData = $`{_id}` + ':' + $`{code}` + ':' + $`{language}`;
  await sendToQueue(process.env.queue, contructedData);
  return response.status(200).json({ message: 'Problem is running' });
}

async function handleSubmitProblemRoute(request, response) {
  const { _id, code, language } = request.body;
  if (_id == null || code == null || language == null) {
    return response
      .status(400)
      .json({ message: 'Problem id or code or language is null' });
  }
  const contructedData = $`{_id}` + ':' + $`{code}` + ':' + $`{language}`;
  await sendToQueue(process.env.queue, contructedData);
  return response.status(200).json({ message: 'Problem is submitting' });
}

module.exports = {
  handleSubmitProblemRoute,
  handleGetProblemRoute,
  handleRunProblemRoute,
};
