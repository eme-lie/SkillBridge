import Sector from "../models/sectorModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const getSector = asyncHandler(async (req, res) => {
  const sectors = await Sector.find({});
  res.status(200).json(sectors);
});

export default getSector;
