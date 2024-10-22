const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' })

let mongooseURI;

if (process.env.NODE_ENV === 'production') {
    mongooseURI = process.env.MONGO_URI;
  } else {
    mongooseURI = process.env.MONGO_URI_DEV;
}


mongoose.set('strictQuery', true)  //allow only queries that match the schema definition.

const connectToMongo = () => {
    mongoose.connect(mongooseURI)
    console.log('connected to mongoDB')
}


module.exports = connectToMongo

