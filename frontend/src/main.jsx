import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Internships from "../components/Internships.jsx";
import Internship from "../components/internship.jsx";

import Resources from "../components/Resources";
import SavedResources from "../components/SavedResources";
import SavedInternships from "../components/SavedInternships";
import UserProfile from "../components/UserProfile";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
