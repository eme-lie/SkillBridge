import User from "../models/userModel.js";
import { Discussion } from "../models/discussionModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";

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
    const user = await User.login(email, password);

    //generate token
    const token = generateToken(user._id);

    res
      .status(200)
      .json({ email, token, id: user._id, userDisplayName: user.displayName });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// user signUp
export const userSignUp = asyncHandler(async (req, res) => {
  const { displayName, email, password } = req.body;

  try {
    const user = await User.signup(displayName, email, password);

    //generate token
    const token = generateToken(user._id);

    res
      .status(200)
      .json({ email, token, id: user._id, userDisplayName: user.displayName });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//save discussion
export const saveDiscussion = asyncHandler(async (req, res) => {
  const discussionId = req.params.id;
  const { userId } = req.body;
  console.log({ userId });
  console.log({ discussionId });

  const discussion = await Discussion.findById(discussionId);
  const user = await User.findById(userId);

  if (!discussion) {
    return res.status(404).json({ error: "Discussion not found" });
  } else if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Check if the user has already saved the discussion
  const userHasSavedDiscussionApi =
    user.savedDiscussions.includes(discussionId);

  if (userHasSavedDiscussionApi) {
    // Remove discussion ID from the savedDiscussions array (unsave)
    user.savedDiscussions.pull(discussionId);
  } else {
    // Add discussion ID to the savedDiscussions array
    user.savedDiscussions.push(discussionId);
  }

  await user.save();

  res
    .status(200)
    .json({ userHasSavedDiscussionApi: !userHasSavedDiscussionApi });
});

export const getSavedDiscussions = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  console.log({ userId });
  if (!userId) {
    return res.status(400).json({ error: "User ID not provided" });
  }

  const user = await User.findById(userId).populate("savedDiscussions");

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json(user.savedDiscussions);
});

export const getUserDiscussions = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  console.log({ userId });

  // Step 1: Retrieve User
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Step 2: Get Discussion IDs
  const discussionIds = user.createdDiscussions;

  // Step 3: Query Discussions
  const discussions = await Discussion.find({ _id: { $in: discussionIds } });

  // Step 4: Send Response
  res.status(200).json(discussions);
});

// Check if a discussion is saved by a user
export const isDiscussionSaved = async (req, res) => {
  const discussionId = req.params.discussionId;
  const { userId } = req.query;

  if (!userId) {
    return res
      .status(400)
      .json({ error: "userId is required in query parameters" });
  }

  console.log(`User ID for checkSaved: ${userId}`);
  console.log(`Discussion ID for checkSaved: ${discussionId}`);

  // Validate whether the userId is a valid ObjectId format
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: "Invalid userId formattt" });
  }

  // Convert userId to ObjectId
  let userObjectId;
  try {
    userObjectId = mongoose.Types.ObjectId(userId);
  } catch (error) {
    return res.status(400).json({ error: "Invalid userId format" });
  }

  const user = await User.findById(userObjectId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const userHasSavedDiscussionApi = user.savedDiscussions.some(
    (savedDiscussionId) => savedDiscussionId.equals(discussionId)
  );

  res.status(200).json({ userHasSavedDiscussionApi });
};

export const checkUpvote = async (req, res) => {
  const discussionId = req.params.id;
  const { userId } = req.body;

  console.log({ userId });
  console.log({ discussionId });

  // Convert userId to ObjectId for consistent comparison
  const userObjectId = mongoose.Types.ObjectId.createFromTime(userId);
  const discussion = await Discussion.findById(discussionId);
  const userHasUpvoted = discussion.upvotes.some((upvoteId) =>
    upvoteId.equals(userObjectId)
  );
  res.status(200).json({ userHasUpvoted });
};
