const app = require('../src/app.js');
require('dotenv').config();
const connectToDb = require('./database/index.db');
const {redisConnection} = require('./database/cache.utils.js');

const Port = process.env.PORT || 4000;


connectToDb();
const redisClient = redisConnection();
app.listen(Port, () => {
  console.log('Server up and running on port');
});
