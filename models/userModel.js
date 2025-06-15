import mongoose from "mongoose";
import validator from "validator";
import plm from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid email"],
  },
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
  },
});

userSchema.plugin(plm, { usernameField: "username" });

export default mongoose.model("User", userSchema);
