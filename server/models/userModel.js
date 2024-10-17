import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  image: String,
  email: { type: String },
  googleId: String,
  post: [
    {
      title:{
        type:String,
        required:true
      },
      content:{
        type:String,
        required:true
      },
      image: String,
      like: {
        n: { type: Number, default: 0 },
        likedBy: [
          {
            user: String,
            date: String,
          },
        ],
      },
      comments: [
        {
          comment: String,
          user: String,
          image: String,
        },
      ],
      date: Date,
      public_id: String,
      category:{
        type:String,
        enum:["All","Travel","Fashion","Tech","Health","Quotes","Education","Society","Industry","Agriculture","Marketing","History","Art","Others"],
        required:true
      }
    },
  ],
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const USER = new mongoose.model("USER", userSchema);

export default USER;
