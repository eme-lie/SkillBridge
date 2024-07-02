// models/employerModel.js
import mongoose from "mongoose";

const employerSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Employer = mongoose.model("Employer", employerSchema);

export default Employer;
