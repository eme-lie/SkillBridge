//import { Outlet } from "react-router-dom";
import Internships from "./components/Internships.jsx";
import Internship from "./components/internship.jsx";
import Signup from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";

import Resources from "./components/Resources";
import SavedResources from "./components/SavedResources";
import SavedInternships from "./components/SavedInternships";
import UserProfile from "./components/UserProfile";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const App = () => {
  const router = createBrowserRouter([
    { path: "/internships", element: <Internships /> },
    {
      path: "/internships/:id",
      element: <Internship />,
    },

    { path: "/resources", element: <Resources /> },
    { path: "resources/saved_resources", element: <SavedResources /> },
    { path: "internships/saved_internships", element: <SavedInternships /> },
    { path: "/user_profile", element: <UserProfile /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/Home", element: <Home /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
