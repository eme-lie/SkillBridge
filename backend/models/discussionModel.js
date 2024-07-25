import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    sector: { type: String, required: true },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Discussion = mongoose.model("Discussion", discussionSchema);

export default Discussion;
