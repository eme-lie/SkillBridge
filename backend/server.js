import express from "express";
import internshipRoutes from "./routers/internshipRouter.js";
import cors from "cors";
import movieRoutes from "./routers/movieRouter.js";
import filterRoutes from "./routers/filterRouter.js";
import userRoutes from "./routers/userRouter.js";
import discussionRoutes from "./routers/discussionRouter.js";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

connectDB();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
// Enable CORS for all routes
//app.use(cors());

console.log("REACT_APP_API_BASE_URL:", process.env.REACT_APP_API_BASE_URL); // Add this line to debug

app.use(
  cors({
    origin: process.env.REACT_APP_API_BASE_URL, // Use the environment variable
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // If you need to include credentials like cookies
  })
);

app.use("/api/internships", internshipRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/filters", filterRoutes);
app.use("/api/user", userRoutes);
app.use("/api/discussions", discussionRoutes);
app.listen(port, () => {
  console.log(`listening at ${port}`);
});
