import express from "express";
import internshipRoutes from "./routers/internshipRouter.js";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

connectDB();
const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/internships", internshipRoutes);

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
