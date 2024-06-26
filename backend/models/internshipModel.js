import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    logo: { type: String, required: true },
    location: { type: String, required: true },
    employer: { type: String, required: true },
    description: { type: String, required: true },
    sector: { type: String, required: true },
    jobLink: { type: String, required: true },
  },
  { timestamps: true }
);

const Internship = mongoose.model("Internship", internshipSchema);

export default Internship;
