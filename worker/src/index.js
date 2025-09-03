const express = require('express');
const app = express();
require('dotenv').config();
const {startWorker} = require('../src/queue/index.queue');


connectToQueue();
app.listen(process.env.PORT,()=>{
    console.log('Server Started at Port');
});

async function connectToQueue(){
    try{
      const {connection,channel} = await startWorker();
        console.log('Starting rabbit mq server connection initiated');
        return channel;
    }
    catch(error){
        console.log('Error occured connection to rabbit mq failed');
        throw error;
    }
}


/**
 * const express = require('express');
require('dotenv').config();
const { startWorker } = require('../src/queue/index.queue');

const PORT = process.env.PORT || 3000;

async function initApp() {
  try {
    // Step 1: Connect to RabbitMQ and start worker
    const { connection, channel } = await startWorker();
    console.log('✅ RabbitMQ connection established and worker started');

    // Step 2: Initialize Express app
    const app = express();

    // Optional: Add routes/middleware here
    // app.use(...)

    // Step 3: Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Failed to initialize RabbitMQ connection:', error.message);
    process.exit(1); // Gracefully exit if startup fails
  }
}

initApp();

 * 
 * 
 */