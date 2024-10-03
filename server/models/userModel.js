import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  image: String,
  email: { type: String },
  googleId: String,
  post: [
    {
      title: String,
      content: String,
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
    },
  ],
});
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const USER = new mongoose.model("USER", userSchema);

export default USER;
