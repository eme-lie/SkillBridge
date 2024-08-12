// routes/filterRoutes.js
import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import Location from "../models/locationModel.js";
import Sector from "../models/sectorModel.js";
import Employer from "../models/employerModel.js";
import getEmployers from "../controllers/employerController.js";
import getSector from "../controllers/sectorController.js";
import getLocations from "../controllers/locationController.js";
import getTags from "../controllers/tagController.js";

const router = express.Router();

// Get locations
router.get("/locations", getLocations);

// Get sectors
router.get("/sectors", getSector);

// Get employers
router.get("/employers", getEmployers);

// Get tags
router.get("/tags", getTags);

export default router;
