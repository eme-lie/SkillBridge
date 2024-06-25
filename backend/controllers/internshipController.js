import asyncHandler from "../middleware/asyncHandler";
import Internship from "../models/internshipModel";

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

export const getProductById = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);
  if (internship) {
    return res.json(internship);
  } else {
    res.status(404);
    throw new Error("Internship not found");
  }
});
