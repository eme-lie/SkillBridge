import { useLocation } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const location = useLocation();
  const pathSegment = location.pathname.split("/")[1]; // Gets the first segment of the path
  const pathSegment2 = location.pathname.split("/")[2]; // Gets the second segment of the path
  return (
    <div className="navbar flex flex-col gap-x-2 shadow-custom1 ">
      <div className="nav-top flex flex-col pt-2 pr-6 pl-6 pb-2 md:pt-4 md:pr-16 md:pl-16 lg:pb-0 justify-center lg:gap-y-4">
        <div className="nav-top-top flex flex-row justify-between ">
          <div className="nav-top-left-side flex items-center gap-x-4">
            <Sheet className="bg-background_light flex flex-col h-full">
              <SheetTrigger>
                <Menu className="icon_light w-8 flex lg:hidden" />
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-background_light flex flex-col h-full"
              >
                <SheetHeader className="flex flex-col h-full">
                  <SheetTitle className="text-b3"></SheetTitle>
                  <SheetDescription className="flex flex-col justify-between h-full">
                    <ul className="flex flex-col gap-y-4">
                      <li className="text-t2 text-text_light">
                        <Link to="/internships">Internships</Link>
                      </li>
                      <li className="text-t2 text-text_light">
                        <Link to="/resources">Resources</Link>
                      </li>
                      <li className="text-t2 text-text_light">
                        <Link to="/forum">Forum</Link>
                      </li>
                    </ul>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <img
              src="\images\SkillBridge.svg"
              alt=""
              className="w-24 hidden lg:block"
            />
          </div>

          <img
            src="\images\SkillBridge.svg"
            alt=""
            className="w-24 block lg:hidden"
          />

          <div className="nav-top-right-side flex flex-row items-center gap-x-8 ">
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <ul className="popup-list flex flex-col">
                  <li className="t-b5 text-text_light pr-2 pb-2 pl-2  border-b-1">
                    Profile
                  </li>
                  <li className="t-b5 text-text_light pr-2 pb-2 pl-2  border-b-1">
                    My Jobs
                  </li>
                  <li className="t-b5 text-text_light pr-2 pb-2 pl-2">
                    Logout
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="nav-top-bottom flex justify-center ">
          <ul className="gap-x-16 hidden lg:flex">
            <li
              className={`cursor-pointer text-text_light lg:pr-2 lg:pb-1 lg:pl-2 ${
                pathSegment === "internships"
                  ? "border-primary_light border-b-2 t-b3"
                  : "t-b5"
              }`}
            >
              <Link to="/internships">Internships</Link>
            </li>
            <li
              className={`cursor-pointer text-text_light lg:pr-2 lg:pb-1 lg:pl-2 ${
                pathSegment === "resources"
                  ? "border-primary_light border-b-2 t-b3"
                  : "t-b5"
              }`}
            >
              <Link to="/resources">Resources</Link>
            </li>
            <li
              className={`cursor-pointer text-text_light lg:pr-2 lg:pb-1 lg:pl-2 ${
                pathSegment === "forum"
                  ? "border-primary_light border-b-2 t-b3"
                  : "t-b5"
              }`}
            >
              <Link to="/forum">Forum</Link>
            </li>
          </ul>
        </div>
      </div>
      {pathSegment === "internships" ? (
        <div className="nav-bottom gap-x-4 flex border-border_light border-t border-b py-4 items-center px-16">
          <h1 className="text-t1">Internships</h1>
          <div>
            <ul className="flex gap-x-4">
              <li
                className={`text-b4 px-2  ${
                  pathSegment2 === "saved_internships"
                    ? ""
                    : "border-b-2 border-text-light"
                }`}
              >
                <Link to="/internships">search</Link>
              </li>

              <li
                className={`text-b4 px-2 ${
                  pathSegment2 === "saved_internships"
                    ? "border-b-2  border-text-light"
                    : ""
                }`}
              >
                <Link to="/internships/saved_internships">saved</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : pathSegment === "resources" ? (
        <div className="nav-bottom gap-x-4 flex border-border_light border-t border-b py-4 items-center px-16 ">
          <h1 className="text-t1">Resources</h1>
          <div>
            <ul className="flex gap-x-4">
              <li
                className={`text-b4 px-2  ${
                  pathSegment2 === "saved_resources"
                    ? ""
                    : "border-b-2 border-text-light"
                }`}
              >
                <Link to="/resources">search</Link>
              </li>

              <li
                className={`text-b4 px-2 ${
                  pathSegment2 === "saved_resources"
                    ? "border-b-2  border-text-light"
                    : ""
                }`}
              >
                <Link to="/resources/saved_resources">saved</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
