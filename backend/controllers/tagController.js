import Tag from "../models/tagModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const getTag = asyncHandler(async (req, res) => {
  const tags = await Tag.find({});
  res.status(200).json(tags);
});

export default getTag;
