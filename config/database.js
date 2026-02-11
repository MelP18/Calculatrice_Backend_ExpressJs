// const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/calculationDB',{}).then(()=>{
//     console.log('Connection Succesfully ...');
// }).catch((e)=>{
//     console.log('Connection Failed ...');
// })
// const mongoose = require("mongoose");

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("MONGODB_URI non définie");
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, {
//       bufferCommands: false, // serverless friendly
//     }).then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// module.exports = connectDB;

const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  const db = await mongoose.connect(process.env.MONGO_URI);
  isConnected = db.connections[0].readyState === 1;
  console.log("MongoDB connecté");
};

module.exports = connectDB;
