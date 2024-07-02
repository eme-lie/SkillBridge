import Employer from "../models/employerModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// Get employers
const getEmployers = asyncHandler(async (req, res) => {
  const employers = await Employer.find({});
  res.status(200).json(employers);
});

/*router.get(
  "/employers",
  asyncHandler(async (req, res) => {
    const employers = await Employer.find({});
    res.status(200).json(employers);
  })
);*/

export default getEmployers;
