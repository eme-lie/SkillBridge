import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import internshipRoutes from "./routers/internshipRouter.js";
import movieRoutes from "./routers/movieRouter.js";
import filterRoutes from "./routers/filterRouter.js";
import userRoutes from "./routers/userRouter.js";
import discussionRoutes from "./routers/discussionRouter.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
// Enable CORS for all routes
//app.use(cors());

console.log("REACT_APP_API_BASE_URL:", process.env.REACT_APP_API_BASE_URL); // Add this line to debug

// Debugging: Log each incoming request to verify CORS middleware is applied
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

const allowedOrigin = process.env.REACT_APP_API_BASE_URL;
console.log("allowedOrigin:", allowedOrigin);

app.use(
  cors({
    origin: allowedOrigin, // Use the environment variable
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    credentials: true, // If you need to include credentials like cookies
  })
);

// Routes
console.log(
  "REACT_APP_API_BASE_URL_SECOND:",
  process.env.REACT_APP_API_BASE_URL
); // Add this line to debug

app.use("/api/internships", internshipRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/filters", filterRoutes);
app.use("/api/user", userRoutes);
app.use("/api/discussions", discussionRoutes);
app.listen(port, () => {
  console.log(`listening at ${port}`);
});
