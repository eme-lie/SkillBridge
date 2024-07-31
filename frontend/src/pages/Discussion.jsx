import DiscussionsGuidelines from "@/components/DiscussionsGuidelines";
import Sidenavbar from "@/components/Sidenavbar";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { CircleChevronUp } from "lucide-react";

const Discussion = () => {
  const errors = {};
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="main-container flex flex-row lg:pt-4 lg:pr-16 lg:pl-4">
        <Sidenavbar />
        <div className="right-container flex flex-col flex-1 px-4 py-4">
          <div className="flex items-center justify-between border-b border-b-border_light pb-4">
            <div className="flex flex-col gap-y-1">
              <h1 className="text-h2">Discussion</h1>
              <div className="other-details flex gap-x-4">
                <div className="other-detail flex gap-x-1">
                  <p className="text-sb1">Created</p>
                  <p className="text-sb2">14 days ago</p>
                </div>
                <div className="other-detail flex gap-x-1">
                  <p className="text-sb1">7</p>
                  <p className="text-sb2">replies</p>
                </div>
              </div>
            </div>

            <Button
              className="border border-primary_light text-primary_light rounded-lg w-fit px-6 py-2 text-sm font-medium "
              onClick={() => console.log("clicked")}
            >
              Start Discussion
            </Button>
          </div>

          <div className="bottom flex flex-col lg:flex-row py-8 gap-x-8 gap-y-8">
            <div className="bottom-left flex flex-col flex-1 gap-y-12 ">
              <div className="bottom-left-1 flex">
                <div className="discussion-card flex pl-8 pb-3 pr-3 gap-x-4 border-b">
                  <div className="votes-div flex flex-col gap-y-2 items-center">
                    <CircleChevronUp size={32} className="-mt-1" />
                    <p className="text-b3">10</p>
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
              <div className="bottom-left-2 flex-1">
                <form
                  //onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="bg-Neutral400 w-full flex flex-col rounded gap-y-4 border border-rounded border-border_light p-4"
                >
                  <textarea
                    //{...register("email")}
                    type="text"
                    placeholder="Add to the discussion"
                    className={`textarea-input h-32 w-full rounded border focus:outline pl-4 pt-2 placeholder-gray-500 placeholder-opacity-75 ${
                      errors.textarea ? "error-class border-destructive" : ""
                    }`}
                  />
                  {errors.textarea && (
                    <p className="error-response text-b4 text-destructive_light">
                      {errors.textarea.message}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="bg-primary_light text-text_dark flex w-fit"
                    //disabled={isSubmitting}

                    /*className={`button-class ${
                    isSubmitting
                      ? "bg-primary_light bg-opacity-70 w-fit text-text_light pt-4 pr-6 pb-4 pl-6 rounded text-lg font-medium"
                      : "bg-primary_light w-fit text-text_light pt-3 pr-4 pb-3 pl-4 md:pt-4 md:pr-6 md:pb-4 md:pl-6 rounded font-medium text-sm md:text-lg"
                  }`}*/
                  >
                    Reply
                  </Button>

                  {errors._general && (
                    <p className="error-response text-destructive_light text-b4 mt-2">
                      {errors._general.message}
                    </p>
                  )}
                </form>
              </div>
              <div className="bottom-left-3 flex flex-col flex-1 gap-y-3">
                <div className="bottom-left-top flex items-center justify-between ">
                  <p className="text-t1">26 Replies</p>
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
                </div>
                <div className="reply-card flex pb-3 pr-3 gap-x-4 border-b">
                  <div className="votes-div flex flex-col gap-y-2 items-center">
                    <CircleChevronUp size={32} className="-mt-1" />
                    <p className="text-b3">10</p>
                  </div>

                  <div className="reply-card-right flex flex-col gap-y-2">
                    <div className="top-details flex justify-between items-center">
                      <div className="flex gap-x-2 items-center">
                        <div className="h-6 w-6 bg-background_alt_light rounded"></div>
                        <p className="text-sb1">Emelie Obiora</p>
                      </div>
                    </div>
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
                    <div className="bottom-details flex items-center">
                      <p className="text-b5">August 7 at 11:15</p>
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

export default Discussion;
