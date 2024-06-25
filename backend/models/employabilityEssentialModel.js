const employabilityEssentialSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    image: { type: String, required: true },
    writerName: { type: String, required: true },
    writerImage: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const employabilityEssential = mongoose.model(
  "employabilityEssential",
  employabilityEssentialSchema
);

export default employabilityEssential;
