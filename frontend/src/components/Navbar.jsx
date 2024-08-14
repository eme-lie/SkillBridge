//import { useLocation } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover.jsx";
import { Button } from "@/ui/button.jsx";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar.jsx";
import { Link, useNavigate } from "react-router-dom";
import {
  MessagesSquare,
  MessageSquareShare,
  Bookmark,
  LogOut,
  User,

  /*BookmarkCheck,*/
} from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/ui/sheet.jsx";
import { useLogout } from "@/hooks/useLogout";
import { useAuthContext } from "../hooks/authHook";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const { logout } = useLogout();
  const {
    state: { user },
  } = useAuthContext();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  //const location = useLocation();
  //const pathSegment = location.pathname.split("/")[1]; // Gets the first segment of the path
  //const pathSegment2 = location.pathname.split("/")[2]; // Gets the second segment of the path
  return (
    <div className="navbar nav-top flex flex-row pt-4 pr-6 pl-6 pb-4 md:pt-8 md:pr-16 md:pl-16 md:pb-8 lg:gap-y-4 shadow-custom1 justify-between items-center">
      <div className="nav-top-left-side flex items-center gap-x-4">
        <Sheet className="bg-background_light flex flex-col h-full">
          <SheetTrigger>
            <Menu className="icon_light w-8 flex md:hidden" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-background_light flex flex-col h-full"
          >
            <SheetHeader className="flex flex-col h-full">
              <SheetTitle className="text-b3"></SheetTitle>
              <SheetDescription className="flex flex-col gap-y-8 h-full">
                <div className="side-nav-top flex flex-col gap-y-6 py-12 pr-8 border-r">
                  <Link
                    to="/discussions"
                    className="side-nav-item flex flex-row gap-x-2 items-center hover:text-primary_light"
                  >
                    <MessagesSquare
                      className={`icon transition-colors duration-200 ${
                        pathname === "/discussions"
                          ? "text-primary_light"
                          : "text-light"
                      } hover:text-primary_light`}
                      size={16}
                    />
                    <span
                      className={`icon transition-colors duration-200 ${
                        pathname === "/discussions"
                          ? "text-primary_light"
                          : "text-light"
                      } hover:text-primary_light`}
                    >
                      All Discussions
                    </span>
                  </Link>
                  <Link
                    to="/created_discussions"
                    className="side-nav-item flex flex-row gap-x-2 items-center hover:text-primary_light"
                  >
                    <MessageSquareShare
                      className={`icon transition-colors duration-200 ${
                        pathname === "/created_discussions"
                          ? "text-primary_light"
                          : "text-light"
                      } hover:text-primary_light`}
                      size={16}
                    />
                    <span
                      className={`icon transition-colors duration-200 ${
                        pathname === "/created_discussions"
                          ? "text-primary_light"
                          : "text-light"
                      } hover:text-primary_light`}
                    >
                      My Posts
                    </span>
                  </Link>
                  <Link
                    to="/saved_discussions"
                    className="side-nav-item flex flex-row gap-x-2 items-center hover:text-primary_light"
                  >
                    <Bookmark
                      className={`icon transition-colors duration-200 ${
                        pathname === "/saved_discussions"
                          ? "text-primary_light"
                          : "text-light"
                      } hover:text-primary_light`}
                      size={16}
                    />
                    <span
                      className={`icon transition-colors duration-200 ${
                        pathname === "/saved_discussions"
                          ? "text-primary_light"
                          : "text-light"
                      } hover:text-primary_light`}
                    >
                      Saves
                    </span>
                  </Link>
                </div>
                {!user && (
                  <div className=" side-nav-bottom flex flex-col gap-y-2 py-12 pr-8 border-r ">
                    <Link to="/">
                      <Button className="w-full border border-rounded border-lg">
                        Login
                      </Button>
                    </Link>
                    <Link to="/sign_up">
                      <Button className="w-full bg-primary_light">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Link to="/discussions">
          <img
            src="\images\SkillBridge.svg"
            alt=""
            className="w-24 hidden md:block cursor-pointer"
          />
        </Link>
      </div>

      <Link to="/discussions">
        <img
          src="\images\SkillBridge.svg"
          alt=""
          className="w-24 block md:hidden cursor-pointer"
        />
      </Link>

      <div className="nav-top-right-side flex flex-row items-center gap-x-8 ">
        {!user && (
          <div className=" flex gap-x-4 ">
            <Link to="/">
              <Button className="w-full border border-rounded border-lg">
                Login
              </Button>
            </Link>
            <Link to="/sign_up">
              <Button className="w-full bg-primary_light">Sign Up</Button>
            </Link>
          </div>
        )}
        {user && (
          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="bg-background_light">
              <div className="popup-list flex flex-col gap-y-4 bg-background_light cursor-pointer">
                <Link
                  to="/discussions"
                  className="side-nav-item flex flex-row gap-x-2 items-center hover:text-primary_light"
                >
                  <User
                    className="icon transition-colors duration-200"
                    size={16}
                  />
                  <span className="text-b4 transition-colors duration-200 group-hover:text-primary_light ">
                    Profile
                  </span>
                </Link>

                <div className="side-nav-item flex flex-row gap-x-2 items-center hover:text-primary_light cursor-pointer">
                  <LogOut
                    className="icon transition-colors duration-200"
                    size={16}
                  />

                  <span
                    className="text-b4 transition-colors duration-200 group-hover:text-primary_light"
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
        {/*<Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <ul className="popup-list flex flex-col">
              {user && (
                <li className="t-b5 text-text_light pr-2 pb-2 pl-2  border-b-1">
                  Profile
                </li>
              )}
              {!user && (
                <li className="t-b5 text-text_light pr-2 pb-2 pl-2  border-b-1">
                  Login
                </li>
              )}
              {!user && (
                <li className="t-b5 text-text_light pr-2 pb-2 pl-2  border-b-1">
                  Sign Up
                </li>
              )}

              {user && (
                <li
                  className="t-b5 text-text_light pr-2 pb-2 pl-2"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              )}
            </ul>
          </PopoverContent>
        </Popover> */}
      </div>
    </div>
  );
};

export default Navbar;
