import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "./.env" });

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

export default connect;
