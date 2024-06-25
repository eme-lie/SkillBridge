import bcryptjs from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcryptjs.hashSync("123456", 10),
    isAdmin: true,
    userType: "admin",
  },
  {
    name: "Emelie Student",
    email: "student@email.com",
    password: bcryptjs.hashSync("123456", 10),
    isAdmin: false,
    userType: "student",
  },
  {
    name: "Emelie Employer",
    email: "employer@email.com",
    password: bcryptjs.hashSync("123456", 10),
    isAdmin: false,
    userType: "employer",
  },
];

export default users;
