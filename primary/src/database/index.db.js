const mongoose = require("mongoose");

async function connectToDb() {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongodb connection successfull");
  } catch (e) {
    console.log("Mongodb connection failed");
    process.exit(1);
  }
}

module.exports = connectToDb;
