//import { Outlet } from "react-router-dom";
import Internships from "./pages/Internships.jsx";
import Internship from "./pages/internship.jsx";
import Signup from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import CreateDiscussion from "./pages/CreateDiscussion.jsx";
import Discussions from "./pages/Discussions.jsx";

import Resources from "./pages/Resources.jsx";
import SavedResources from "./pages/SavedResources.jsx";
import SavedDiscussions from "./pages/SavedDiscussions.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Discussion from "./pages/Discussion.jsx";

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
    { path: "/saved_discussions", element: <SavedDiscussions /> },
    { path: "/user_profile", element: <UserProfile /> },
    { path: "/sign_up", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/Home", element: <Home /> },
    { path: "/create_discussion", element: <CreateDiscussion /> },
    { path: "/edit_discussion/:id", element: <CreateDiscussion /> },
    { path: "/discussions", element: <Discussions /> },
    { path: "/discussions/:id", element: <Discussion /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
