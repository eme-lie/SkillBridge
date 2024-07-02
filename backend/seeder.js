import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import internships from "./data/internships.js";
import sectors from "./data/sectors.js";
import employers from "./data/employers.js";
import locations from "./data/locations.js";
import movies from "./data/movies.js";
import Movie from "./models/movieModel.js";
import User from "./models/userModel.js";
import Internship from "./models/internshipModel.js";
import EmployabilityEssential from "./models/employabilityEssentialModel.js";
import Sector from "./models/sectorModel.js";
import Employer from "./models/employerModel.js";
import Location from "./models/locationModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Internship.deleteMany();
    await EmployabilityEssential.deleteMany();
    await User.deleteMany();
    await Movie.deleteMany();
    await Sector.deleteMany();
    await Employer.deleteMany();
    await Location.deleteMany();

    const createdMovies = await Movie.insertMany(movies);
    const createdSectors = await Sector.insertMany(
      sectors.map((name) => ({ name }))
    );
    const createdEmployers = await Employer.insertMany(
      employers.map((name) => ({ name }))
    );
    const createdLocations = await Location.insertMany(
      locations.map((name) => ({ name }))
    );

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleInternships = internships.map((internship) => {
      return { ...internship, user: adminUser };
    });

    await Internship.insertMany(sampleInternships);
    //.green.inverse and.red.inverse are just a color for the console.log. Remember you installed and imported colors into this model.
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Internship.deleteMany();
    await EmployabilityEssential.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
