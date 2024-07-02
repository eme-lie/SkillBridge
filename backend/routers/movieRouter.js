import express from "express";
const router = express.Router();

import { getMovies } from "../controllers/movieController.js";

router.route("/").get(getMovies);

export default router;
