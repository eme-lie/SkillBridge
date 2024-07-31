import userModel from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import jsonwebtoken from "jsonwebtoken";

//function for generating jwt token
const generateToken = (_id) => {
  return jsonwebtoken.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

// user login
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    //login user
    const user = await userModel.login(email, password);

    //generate token
    const token = generateToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// user signUp
export const userSignUp = asyncHandler(async (req, res) => {
  const { displayName, email, password } = req.body;

  try {
    const user = await userModel.signup(displayName, email, password);

    //generate token
    const token = generateToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
