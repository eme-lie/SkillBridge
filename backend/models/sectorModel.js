// models/sectorModel.js
import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Sector = mongoose.model("Sector", sectorSchema);
export default Sector;
