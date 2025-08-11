const app  = require('../src/app.js');
require('dotenv').config();
const connectToDb = require('./database/index.db');

const Port = process.env.PORT || 4000


connectToDb();
app.listen(Port,()=>{
    console.log('Server up and running on port');
});