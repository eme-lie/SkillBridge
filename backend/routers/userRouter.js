import {
  userLogin,
  userSignUp,
  saveDiscussion,
  getSavedDiscussions,
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

export default router;
