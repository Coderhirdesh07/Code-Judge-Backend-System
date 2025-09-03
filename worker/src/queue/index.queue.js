const amqp = require('amqplib/callback_api');
const runCode = require('../executor/runCode');
require('dotenv').config();


const queue = process.env.QUEUE_NAME;

async function startWorker() {
  const connection  = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await connection.channel();

  await channel.assertQueue(queue,{durable:false});
  console.log('Worker listening from queue');


  channel.consume(queue,async(msg)=>{
    if(!msg) return;
    console.log('');
    try{
      const Job = JSON.parse(msg.toString());
      const {code,language} = Job;
      const result = await runCode(code,language);
      console.log('Execution result in progress');

    }
    catch(error){
      console.log(error);
      throw error;
    }

  });

  return {connection,channel};
}

module.exports  = {startWorker};

