import express from "express";
const router = express.Router();
//import { requireAuth } from "../middleware/requireAuth.js";
import {
  getDiscussions,
  getDiscussionById,
  createDiscussion,
  toggleUpvote,
  saveDiscussion,
  replyDiscussion,
  editDiscussion,
  checkUpvote,
} from "../controllers/discussionController.js";

// GET /api/discussions
router.route("/").get(getDiscussions);

// POST /api/discussions
router.route("/").post(createDiscussion);

//
//router.use(requireAuth);

// GET /api/discussions/:id
router.route("/:id").get(getDiscussionById);

// PUT /api/discussions/:id/upvote
//router.route("/:id/upvote").put(toggleUpvote);

//router.put("/api/discussions/:id/upvote", requireAuth, toggleUpvote);

router.route("/save_discussion/:id").put(saveDiscussion);

//router.route("/api/discussions/save_discussion/:id").put(saveDiscussion);

{
  /*router.put(
  "/api/discussions/save_discussion/:id",
  requireAuth,
  (req, res, next) => {
    console.log(`Request to /api/discussions/${req.params.id}/save_discussion`);
    next();
  },
  saveDiscussion
);*/
}

// POST /api/discussions/:id/reply
router.route("/:id/reply").put(replyDiscussion);

router.route("/upvote/:id").put(toggleUpvote);

router.route("/edit_discussion/:id").put(editDiscussion);

router.route("/check_upvote/:id").get(checkUpvote);

export default router;
