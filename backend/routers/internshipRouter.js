import express from "express";
const router = express.Router();
import {
  getInternships,
  getInternshipById,
} from "../controllers/internshipController";

router.route("/").get(getInternships);
router.route("/:id").get(getInternshipById);

export default router;
