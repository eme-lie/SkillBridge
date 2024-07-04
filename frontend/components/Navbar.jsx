import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Navbar = () => {
  const location = useLocation();
  const pathSegment = location.pathname.split("/")[1]; // Gets the first segment of the path
  return (
    <div className="navbar flex flex-col shadow-custom1 lg:pt-4 lg:pr-16 lg:pl-16 gap-y-8">
      <div className="nav-top flex flex-row justify-between ">
        <img src="images\SkillBridge.svg" alt="" className="w-24" />
        <div className="nav-top-right-side flex flex-row items-center gap-x-8 ">
          <p className="t-b5 text-text_light">Login</p>
          <Button className="text-b3 bg-primary_light">Sign Up</Button>
          <Popover>
            <PopoverTrigger>
              <FontAwesomeIcon icon={faBars} />
            </PopoverTrigger>
            <PopoverContent>
              <ul className="popup-list flex flex-col gap-x-16">
                <li className="t-b5 text-text_light lg:pr-2 lg:pb-2 lg:pl-2  border-b-2">
                  Login
                </li>
                <li className="t-b5 text-text_light lg:pr-2 lg:pb-2 lg:pl-2  border-b-2">
                  Sign Up
                </li>
                <li className="t-b5 text-text_light lg:pr-2 lg:pb-2 lg:pl-2  border-b-2">
                  Logout
                </li>
                <li className="t-b5 text-text_light lg:pr-2 lg:pb-2 lg:pl-2  border-b-2">
                  Profile
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="nav-bottom flex justify-center">
        <ul className="flex flex-row gap-x-16">
          <li
            className={`cursor-pointer text-text_light lg:pr-2 lg:pb-1 lg:pl-2 ${
              pathSegment === "navbar"
                ? "border-primary_light border-b-2 t-b3"
                : "t-b5"
            }`}
          >
            Internships
          </li>
          <li
            className={`cursor-pointer text-text_light lg:pr-2 lg:pb-1 lg:pl-2 ${
              pathSegment === "resources"
                ? "border-primary_light border-b-2 t-b3"
                : "t-b5"
            }`}
          >
            Resources
          </li>
          <li
            className={`cursor-pointer text-text_light lg:pr-2 lg:pb-1 lg:pl-2 ${
              pathSegment === "forum"
                ? "border-primary_light border-b-2 t-b3"
                : "t-b5"
            }`}
          >
            Forum
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
