import DiscussionsGuidelines from "@/components/DiscussionsGuidelines";
import Sidenavbar from "@/components/Sidenavbar";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover.jsx";

const Discussions = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="main-container flex flex-row lg:pt-4 lg:pr-16 lg:pl-4">
        <Sidenavbar />
        <div className="right-container flex flex-col flex-1 px-4 py-4">
          <div className="top flex flex-col h-16 gap-y-4 py-8 border-b border-b-border_light flex-1">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-1">
                <h1 className="text-h2">Discussion</h1>
                <div className="flex gap-x-2">
                  <Info size={14} />
                  <p className="text-sb1">Discussions</p>
                </div>
              </div>

              <Button
                className="bg-primary_light text-text_light rounded-lg w-fit px-6 py-2 text-sm font-medium"
                onClick={() => console.log("clicked")}
              >
                Create Discussion
              </Button>
            </div>
          </div>
          <div className="bottom flex flex-col lg:flex-row py-8 gap-x-8 gap-y-8">
            <div className="bottom-left flex-1 gap-y-4">
              <div className="bottom-left-top flex items-center justify-between ">
                <p className="text-t1">732 Discussions</p>
                <div className="bottom-left-top-right flex gap-x-2">
                  <div className="sort flex gap-x-2 items-center">
                    <p className="text-b5 text-text_light">Sort by:</p>

                    <select
                      className="border border-border_light py-2 pr-3 rounded-lg h-10 text-b5 text-text_light"
                      //value={sort}
                      //onChange={(e) => setSort(e.target.value)}
                    >
                      <option
                        className="text-b5 text-text_light"
                        value="createdAt,desc"
                      >
                        Newest First
                      </option>
                      <option
                        className="text-b5 text-text_light"
                        value="createdAt,asc"
                      >
                        Oldest First
                      </option>
                      <option
                        className="text-b5 text-text_light"
                        value="title,asc"
                      >
                        Title A-Z
                      </option>
                      <option
                        className="text-b5 text-text_light"
                        value="title,desc"
                      >
                        Title Z-A
                      </option>
                    </select>
                  </div>
                  <div className="clear-show-filters flex gap-x-2 items-center">
                    <Popover className="bg-background_light flex flex-col">
                      <PopoverTrigger>
                        <div className="filters-toggle-mobile-view flex gap-x-1 border rounded-lg items-center py-2 px-2 border-primary_light border-opacity-50">
                          <SlidersHorizontal className="w-4 h-6" />
                          <p className="filters-toggle-mobile-view-text cursor-pointer text-b3">
                            Tags
                          </p>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="bg-background_light flex flex-col h-full">
                        <ul className="popup-list flex flex-col">
                          <li className="t-b5 text-text_light pr-2 pb-2 pl-2  border-b-1">
                            Profile
                          </li>
                          <li className="t-b5 text-text_light pr-2 pb-2 pl-2  border-b-1">
                            Login
                          </li>
                          <li className="t-b5 text-text_light pr-2 pb-2 pl-2  border-b-1">
                            Sign Up
                          </li>
                          <li
                            className="t-b5 text-text_light pr-2 pb-2 pl-2"
                            //onClick={handleLogout}
                          >
                            Logout
                          </li>
                        </ul>
                      </PopoverContent>
                    </Popover>
                    <p
                      className="text-destructive_light cursor-pointer text-b5"
                      //onClick={handleClearFilters}
                    >
                      Clear Filters
                    </p>
                  </div>
                </div>
              </div>
              <div className="bottom-left-bottom flex mt-4">
                <div className="discussion-card flex pl-8 pt-3 pb-3 pr-3 gap-x-6 border-t border-b">
                  <div className="discussion-card-left flex flex-col gap-y-2">
                    <div className="votes-container flex gap-x-1 items-center">
                      <p className="text-b3">0</p>
                      <p className="text-b4">votes</p>
                    </div>
                    <div className="views-container flex gap-x-1 items-center">
                      <p className="text-b3">0</p>
                      <p className="text-b4">views</p>
                    </div>
                    <div className="replies-container flex gap-x-1 items-center">
                      <p className="text-b3">0</p>
                      <p className="text-b4">replies</p>
                    </div>
                  </div>
                  <div className="discussion-card-right flex flex-col gap-y-2">
                    <div className="title-and-sub flex flex-col gap-y-1">
                      <h5 className="text-t3">
                        Best programming languages to learn for developing a web
                        server?
                      </h5>
                      <p className="text-b4">
                        Hi , im a beginner in this world of the programming and
                        i would like that give some advice to begin in this
                        world. Sorry for my english
                      </p>
                    </div>
                    <div className="other-details flex justify-between items-center">
                      <p className="tag py-1 px-3 bg-background_alt_light text-b3">
                        0
                      </p>
                      <div className="other-details-right flex gap-x-4">
                        <div className="other-details-right-left flex gap-x-1">
                          <p className="text-b3">11</p>
                          <p className="text-b5">replied</p>
                        </div>
                        <p className="text-b5">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DiscussionsGuidelines />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussions;
