//import { useLogout } from "@/hooks/useLogout";
import { useAuthContext } from "../hooks/authHook";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  MessagesSquare,
  MessageSquareShare,
  Bookmark,
  //LogOut,
  //User,

  /*BookmarkCheck,*/
} from "lucide-react";

const Sidenavbar = () => {
  //const { logout } = useLogout();
  const {
    state: { user },
  } = useAuthContext();
  {
    /*const handleLogout = async () => {
    await logout();
  }; */
  }

  return (
    <div className="side-nav flex flex-col justify-between h-screen hidden md:flex flex-col">
      <div className="side-nav-top flex flex-col gap-y-6 py-12 pr-8 border-r">
        <Link
          to="/discussions"
          className="side-nav-item flex flex-row gap-x-2 items-center hover:text-primary_light"
        >
          <MessagesSquare
            className="icon transition-colors duration-200"
            size={16}
          />
          <span className="text-b4 transition-colors duration-200 group-hover:text-primary_light ">
            All Discussions
          </span>
        </Link>
        <Link
          to="/discussions"
          className="side-nav-item flex flex-row gap-x-2 items-center hover:text-primary_light"
        >
          <MessageSquareShare
            className="icon transition-colors duration-200"
            size={16}
          />
          <span className="text-b4 transition-colors duration-200 group-hover:text-primary_light ">
            My Posts
          </span>
        </Link>
        <Link
          to="/saved_discussions"
          className="side-nav-item flex flex-row gap-x-2 items-center hover:text-primary_light"
        >
          <Bookmark className="icon transition-colors duration-200" size={16} />
          <span className="text-b4 transition-colors duration-200 group-hover:text-primary_light">
            Saves
          </span>
        </Link>
      </div>
      {!user && (
        <div className=" side-nav-bottom flex flex-col gap-y-2 py-12 pr-8 border-r ">
          <Link to="/login">
            <Button className="w-full border border-rounded border-lg">
              Login
            </Button>
          </Link>
          <Link to="/sign_up">
            <Button className="w-full bg-primary_light">Sign Up</Button>
          </Link>
        </div>
      )}
      {/*<div className="side-nav-bottom flex flex-col gap-y-6 py-12 pr-8 border-r">
        {user && (
          <Link
            to="/discussions"
            className="side-nav-item flex flex-row gap-x-2 items-center hover:text-primary_light"
          >
            <User className="icon transition-colors duration-200" size={16} />
            <span className="text-b4 transition-colors duration-200 group-hover:text-primary_light ">
              Profile
            </span>
          </Link>
        )}
        user && (
          <Link
            to="/discussions"
            className="side-nav-item flex flex-row gap-x-2 items-center hover:text-primary_light"
          >
            <LogOut className="icon transition-colors duration-200" size={16} />

            <span
              className="text-b4 transition-colors duration-200 group-hover:text-primary_light"
              onClick={handleLogout}
            >
              Logout
            </span>
          </Link>
        )
      </div>*/}
    </div>
  );
};

export default Sidenavbar;
