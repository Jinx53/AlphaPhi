
const mongoose = require('mongoose');
require('dotenv/config');

const db = process.env.dBConnection;

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  /*useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,*/
};


function connectDb() {
    let connection;
    try {
        connection = mongoose.connect(db, mongoOptions, handleError);
        return connection;
    } catch (error) {
        console.error('Did not connect, connection error: ', error);
    }
}


function handleError(error) {
    if (error) console.error('Db connection error: ', error);
    else console.log(`Mongodb is connected`);
}

module.exports = {connectDb};