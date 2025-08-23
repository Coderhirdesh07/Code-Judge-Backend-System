const amqp = require('amqplib/callback_api');
const runCode = require('../executor/runCode');
require('dotenv').config();


const queue = process.env.QUEUE_NAME;
amqp.connect(process.env.RABBITMQ_URL, function(error0, connection) {
    if (error0) {
      console.error('Failed to connect to rabbit mq server')
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        console.error('Cannot connect to Rabbit MQ server')
        throw error1;
      }
      
  
      channel.assertQueue(queue, {
        durable: false
      });
      
      console.log(` Worker listening on queue '${queue}'...`);

      channel.consume(queue,
        async function(msg){
          if(!msg) return;
          console.log('Listening from the queue');

          try{
            const Job = JSON.parse(msg.content.toString());
            const {code,language} = Job;

            const result = await runCode(code,language);
            console.log('Execution result is in progress');

          }
          catch(error){
            console.error('Error processing job',err);
          }
        }
      )
    });
  });

