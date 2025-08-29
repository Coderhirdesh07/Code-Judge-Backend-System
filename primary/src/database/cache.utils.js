const { createClient} = require('redis');

async function redisConnection(){
    const client = await createClient(process.env.REDIS_URL)
                    .on("error",(err)=>{console.log("Redis connection failed")})
                    .connect();

};


module.exports = { redisConnection };