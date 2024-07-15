import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    userType: { type: String, required: true },
  },
  { timestamps: true }
);

//static signup method
userSchema.statics.signup = async function (name, email, password, userType) {
  if (!email || !password || !name || !userType) {
    throw new Error("Please fill in all fields");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hashedPassword,
    name,
    userType,
  });

  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  //check if email and password are provided
  if (!email || !password) {
    throw new Error("Please fill in all fields");
  }
  //check if email is valid
  const userExists = await this.findOne({ email });
  if (!userExists) {
    throw new Error("Email does not exist");
  }
  //check if password is correct
  const isMatch = await bcrypt.compare(password, userExists.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return userExists;
};

//create user model
const User = mongoose.model("User", userSchema);

export default User;
