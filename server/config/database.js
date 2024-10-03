import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
//import MongoDBSession from 'connect-mongodb-session';

//const MongoDBStore = MongoDBSession(session);

const connect = async () => {
  await mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
// const store = new MongoDBStore({
//   uri: process.env.COOKIE,
//   collection: 'sessions',
// });

// store.on('error', function (error) {
//   console.log(error);
// console.log(error);
// });

export default connect;
