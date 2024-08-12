import bcryptjs from "bcryptjs";

const users = [
  {
    displayName: "Emelie Charles",
    email: "username@gmail.com",
    password: bcryptjs.hashSync("123456", 10),
  },
  {
    displayName: "Emelie Obiora",
    email: "username1@gmail.com",
    password: bcryptjs.hashSync("123456", 10),
  },
  {
    displayName: "Emelie Chuks",
    email: "username2@gmail.com",
    password: bcryptjs.hashSync("123456", 10),
  },
];

export default users;
