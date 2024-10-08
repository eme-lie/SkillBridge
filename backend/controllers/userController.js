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
  const hasSaved = user.savedDiscussions.includes(discussionId);

  if (hasSaved) {
    // Remove discussion ID from the savedDiscussions array (unsave)
    user.savedDiscussions.pull(discussionId);
  } else {
    // Add discussion ID to the savedDiscussions array
    user.savedDiscussions.push(discussionId);
  }

  await user.save();

  res.status(200).json(discussion);
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

export const checkSavedDiscussions = async (req, res) => {
  const discussionId = req.params.id;
  const { userId } = req.query;

  console.log(`User ID for checkSaved: ${userId}`);
  console.log({ discussionId });

  // Convert userId to ObjectId for consistent comparison
  const userObjectId = mongoose.Types.ObjectId.createFromTime(userId);

  const user = await User.findById(userObjectId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  //const discussion = await User.findById(userId);
  const userHasSavedDiscussion = user.savedDiscussions.some(
    (savedDiscussionId) => savedDiscussionId.equals(discussionId)
  );
  res.status(200).json({ userHasSavedDiscussion });
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
