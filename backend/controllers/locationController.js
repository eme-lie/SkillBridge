import Location from "../models/locationModel.js";

import asyncHandler from "../middleware/asyncHandler.js";

const getLocations = asyncHandler(async (req, res) => {
  const locations = await Location.find({});
  res.status(200).json(locations);
});

export default getLocations;
