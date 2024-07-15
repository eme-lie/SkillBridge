import { userLogin, userSignUp } from "../controllers/userController.js";

import express from "express";
const router = express.Router();

//login userRoute
router.post("/login", userLogin);

//signup userRoute
router.post("/signup", userSignUp);

export default router;
