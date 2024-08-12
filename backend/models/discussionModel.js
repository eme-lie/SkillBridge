import mongoose from "mongoose";

const nestedReplySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  content: { type: String, required: true },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of ObjectId
  createdAt: { type: Date, default: Date.now },
});

const replySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of ObjectId
    replies: [nestedReplySchema], // Nesting the replies schema
  },
  { timestamps: true }
);

export const Reply = mongoose.model("Reply", replySchema);

const discussionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, required: true },
    replies: [replySchema], // Array of replies
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of ObjectId
    status: { type: String, default: "open" },
  },
  { timestamps: true }
);

export const Discussion = mongoose.model("Discussion", discussionSchema);
