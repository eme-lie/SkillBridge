import {
  userLogin,
  userSignUp,
  saveDiscussion,
  getSavedDiscussions,
  getUserDiscussions,
  checkSavedDiscussions,
} from "../controllers/userController.js";

import express from "express";
const router = express.Router();

//login userRoute
router.post("/login", userLogin);

//signup userRoute
router.post("/signup", userSignUp);

//save discussion
router.put("/save_discussion/:id", saveDiscussion);

//get saved discussions
router.get("/saved_discussions", getSavedDiscussions);

//get created discussions
router.get("/created_discussions", getUserDiscussions);

//check saved discussions
router.get("/check_saved_discussions/:id", checkSavedDiscussions);

export default router;
