import Navbar from "../components/Navbar";
import Sidenavbar from "@/components/Sidenavbar";

const SavedDiscussions = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="main-container flex flex-row lg:pt-4 lg:pr-16 lg:pl-4 ">
        <Sidenavbar />
        <div className="right-container py-16 pl-20 flex flex-col gap-y-8">
          <h1 className="text-h1">Your Saved Discussions</h1>
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
                  Hi , im a beginner in this world of the programming and i
                  would like that give some advice to begin in this world. Sorry
                  for my english
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
    </div>
  );
};

export default SavedDiscussions;
