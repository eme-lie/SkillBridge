import express from "express";
import internshipRoutes from "./routers/internshipRouter.js";
import cors from "cors";
import movieRoutes from "./routers/movieRouter.js";
import filterRoutes from "./routers/filterRouter.js";
import userRoutes from "./routers/userRouter.js";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

connectDB();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/internships", internshipRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/filters", filterRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
