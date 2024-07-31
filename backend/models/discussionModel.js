import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
    upvotes: { type: Number, default: 0 },
    replies: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        content: { type: String, required: true },
        upvotes: { type: Number, default: 0 },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const discussionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    replies: [replySchema],
    upvotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discussion", discussionSchema);
