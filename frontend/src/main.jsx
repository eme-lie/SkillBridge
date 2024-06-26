import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import Internships from "../components/Internships.jsx";
import Internship from "../components/Internship.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Internships /> },
  {
    path: "/internships/:id",
    element: <Internship />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
