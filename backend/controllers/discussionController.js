import asyncHandler from "../middleware/asyncHandler.js";
import { Discussion, Reply } from "../models/discussionModel.js";
import Tag from "../models/tagModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

export const getDiscussions = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "title";
    const tag = req.query.tag || "";

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const filterConditions = {
      title: { $regex: search, $options: "i" },
    };

    if (tag) {
      filterConditions.tag = { $regex: tag, $options: "i" };
    }

    const discussions = await Discussion.find(filterConditions)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Discussion.countDocuments(filterConditions);

    const tags = await Tag.find({});

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      discussions,
      filters: {
        tags,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Server Error" });
  }
});

// @desc Fetch all products
// @route GET /api/products
// @access Public

/*export const getInternships = asyncHandler(async (req, res) => {
  const internships = await Internship.find({});
  res.json(internships);
});*/

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public

export const getDiscussionById = asyncHandler(async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);
  if (discussion) {
    return res.json(discussion);
  } else {
    res.status(404);
    throw new Error("Discussion not found");
  }
});

export const createDiscussion = asyncHandler(async (req, res) => {
  const { title, description, tag, user, userDisplayName } = req.body;

  if (!title || !description || !tag || !user || !userDisplayName) {
    res.status(400);
    throw new Error("All fields are required");
  }

  try {
    const discussion = new Discussion({
      title,
      description,
      tag,
      user,
      userDisplayName,
    });

    const createdDiscussion = await discussion.save();

    const the_user = await User.findById(user);
    if (!the_user) {
      throw new Error("User not found");
    }

    the_user.createdDiscussions.push(createdDiscussion._id);
    await the_user.save();

    res.status(201).json({
      discussion: createdDiscussion,
      user: the_user,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

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

export const toggleUpvote = async (req, res) => {
  const discussionId = req.params.id;
  const { userId } = req.body;

  console.log({ userId });
  console.log({ discussionId });

  // Convert userId to ObjectId for consistent comparison
  const userObjectId = mongoose.Types.ObjectId.createFromTime(userId);

  const discussion = await Discussion.findById(discussionId);
  const user = await User.findById(userId);

  if (!discussion) {
    return res.status(404).json({ error: "Discussion not found" });
  } else if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  try {
    // Check if the user has already upvoted the discussion using equals method
    const hasUpvoted = discussion.upvotes.some((upvoteId) =>
      upvoteId.equals(userObjectId)
    );
    const hasSaved = user.upvotedDiscussions.some((discussionId) =>
      discussionId.equals(discussion._id)
    );

    if (hasUpvoted && hasSaved) {
      try {
        // Remove user ID from the upvotes array (unupvote)
        discussion.upvotes.pull(userObjectId);
        user.upvotedDiscussions.pull(discussion._id);
      } catch (error) {
        console.error("Error removing upvote:", error);
        return res.status(500).json({ message: "Error removing upvote" });
      }
    } else {
      try {
        // Add user ID to the upvotes array
        discussion.upvotes.push(userObjectId);
        user.upvotedDiscussions.push(discussion._id);
      } catch (error) {
        console.error("Error adding upvote:", error);
        return res.status(500).json({ message: "Error adding upvote" });
      }
    }
  } catch (error) {
    console.error("Error checking upvote status:", error);
    return res.status(500).json({ message: "Error checking upvote status" });
  }

  await discussion.save();
  await user.save();

  res.status(200).json(discussion);
};
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

export const getCreatedDiscussions = asyncHandler(async (req, res) => {
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
  const hasCreated = user.createdDiscussions.includes(discussionId);

  if (hasCreated) {
    // Remove discussion ID from the CreatedDiscussions array (unsave)
    user.createdDiscussions.pull(discussionId);
  } else {
    // Add discussion ID to the CreatedDiscussions array
    user.CreatedDiscussions.push(discussionId);
  }

  await user.save();

  res.status(200).json(discussion);
});

export const replyDiscussion = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { userId, data, userDisplayName } = req.body;
  console.log({ userId, data, userDisplayName });

  const discussion = await Discussion.findById(id);

  if (!discussion) {
    return res.status(404).json({ error: "Discussion not found" });
  }

  const reply = new Reply({
    user: userId,
    content: data.reply,
    userDisplayName: userDisplayName,
  });

  discussion.replies.push(reply);

  await discussion.save();

  res.status(200).json(discussion);
});

export const editDiscussion = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { title, description, tag } = req.body;

  const discussion = await Discussion.findById(id);

  if (!discussion) {
    return res.status(404).json({ error: "Discussion not found" });
  }

  discussion.title = title;
  discussion.description = description;
  discussion.tag = tag;

  await discussion.save();

  res.status(200).json(discussion);
});
