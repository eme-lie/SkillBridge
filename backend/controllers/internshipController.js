import asyncHandler from "../middleware/asyncHandler.js";
import Internship from "../models/internshipModel.js";
import Location from "../models/locationModel.js";
import Sector from "../models/sectorModel.js";
import Employer from "../models/employerModel.js";

export const getInternships = asyncHandler(async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "title";
    const location = req.query.location || "";
    const sector = req.query.sector || "";
    const employer = req.query.employer || "";

    const sortQuery = sort.split(",");

    //req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sortQuery[1]) {
      sortBy[sortQuery[0]] = sortQuery[1];
    } else {
      sortBy[sortQuery[0]] = "asc";
    }

    const filterConditions = {
      title: { $regex: search, $options: "i" },
    };

    if (location) {
      filterConditions.location = { $regex: location, $options: "i" };
    }

    if (sector) {
      filterConditions.sector = { $regex: sector, $options: "i" };
    }

    if (employer) {
      filterConditions.employer = { $regex: employer, $options: "i" };
    }

    const internships = await Internship.find(filterConditions)
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Internship.countDocuments(filterConditions);

    const locations = await Location.find({});
    const sectors = await Sector.find({});
    const employers = await Employer.find({});

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      internships,
      filters: {
        locations,
        sectors,
        employers,
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

export const getInternshipById = asyncHandler(async (req, res) => {
  const internship = await Internship.findById(req.params.id);
  if (internship) {
    return res.json(internship);
  } else {
    res.status(404);
    throw new Error("Internship not found");
  }
});
