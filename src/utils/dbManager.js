// getting-started.js
const mongoose = require('mongoose');

async function connectToDB() {
  //   if url connection string is present,
  // connect to db
  if (process.env.MONGODB_URL) {
    await mongoose.connect(process.env.MONGODB_URL, { dbName: 'todoapp' });
  } else {
    throw new Error('Mongo db url is missing.');
    // throw missing url error;
  }
}

module.exports = { connectToDB };
