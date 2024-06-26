import asyncHandler from "../middleware/asyncHandler.js";
import Internship from "../models/internshipModel.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public

export const getInternships = asyncHandler(async (req, res) => {
  const internships = await Internship.find({});
  res.json(internships);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public

export const getInternshipById = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);
  if (internship) {
    return res.json(internship);
  } else {
    res.status(404);
    throw new Error("Internship not found");
  }
});
