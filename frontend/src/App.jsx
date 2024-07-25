//import { Outlet } from "react-router-dom";
import Internships from "./pages/Internships.jsx";
import Internship from "./pages/internship.jsx";
import Signup from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Discussions from "./pages/Discussions.jsx";

import Resources from "./pages/Resources.jsx";
import SavedResources from "./pages/SavedResources.jsx";
import SavedInternships from "./pages/SavedInternships.jsx";
import UserProfile from "./pages/UserProfile.jsx";

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
    { path: "/discussions", element: <Discussions /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
