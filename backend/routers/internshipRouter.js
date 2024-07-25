import express from "express";
const router = express.Router();
//import { requireAuth } from "../middleware/requireAuth.js";
import {
  getInternships,
  getInternshipById,
} from "../controllers/internshipController.js";

// GET /api/internships
router.route("/").get(getInternships);

//
//router.use(requireAuth);

// GET /api/internships/:id
router.route("/:id").get(getInternshipById);

export default router;
