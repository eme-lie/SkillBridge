import DiscussionsGuidelines from "@/components/DiscussionsGuidelines";
import Sidenavbar from "@/components/Sidenavbar";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { CircleChevronUp, Reply, Bookmark, CircleEllipsis } from "lucide-react";
import axiosInstance from "../axiosInstance";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/authHook";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover.jsx";

import { formatDistanceToNow, format } from "date-fns";

const schema = z.object({
  reply: z.string().min(1, { message: "Input cannot be empty" }),
});

const Discussion = () => {
  const {
    state: { user },
  } = useAuthContext();

  const { id: discussionId } = useParams();
  const userId = user?.id;
  const userDisplayName = user?.userDisplayName;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (data) => {
    try {
      console.log("Submitting reply:", data);
      await axiosInstance.put(`/api/discussions/${discussionId}/reply`, {
        data,
        userId,
        userDisplayName,
      });
      reset();
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError("_general", {
          type: "manual",
          message: error.response.data.message,
        });
      } else if (error.request) {
        setError("_general", {
          type: "manual",
          message: "No response from the server",
        });
      } else {
        setError("_general", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  const [discussion, setDiscussion] = useState(null);
  const [UserHasUpvoted, setUserHasUpvoted] = useState(false);
  const [voteCount, setVoteCount] = useState(0);
  const [hasSavedDiscussion, setHasSavedDiscussion] = useState(false);

  //fetching discussion data on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for discussion ID:", discussionId);
        const { data } = await axiosInstance.get(
          `/api/discussions/${discussionId}`
        );
        setVoteCount(data.upvotes.length);

        console.log("Fetched data:", data);
        setDiscussion(data);
      } catch (error) {
        console.error("Error fetching discussion:", error);
      }
    };

    if (discussionId) {
      fetchData();
    }
  }, [discussionId]);

  //checking if discussion is saved by user on page load
  useEffect(() => {
    const checkSavedDiscussion = async () => {
      try {
        console.log("Checking saved status for discussion ID:", discussionId);
        console.log("User ID:", userId);

        if (!userId) {
          const { data } = await axiosInstance.get(
            `/api/user/isDiscussionSaved/${discussionId}`,
            {
              params: { userId },
            }
          );

          console.log("Checked saved status:", data);
          setHasSavedDiscussion(data.userHasSavedDiscussionApi);
        }
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };
    checkSavedDiscussion();
  }, [discussionId]);

  //checking if discussion is upvoted by user on page load
  {
    useEffect(() => {
      if (discussion) {
        const checkUpvote = async () => {
          try {
            console.log(
              "Checking upvote status for discussion ID:",
              discussionId
            );
            console.log("User ID:", userId);

            const { data } = await axiosInstance.get(
              `/api/discussions/check_upvote/${discussionId}`,
              {
                userId,
              }
            );
            console.log("Checked upvote status:", data);
            setUserHasUpvoted(data.userHasUpvoted);
          } catch (error) {
            console.error("Error checking upvote status:", error);
          }
        };
        checkUpvote();
      }
    }, [discussion, discussionId]);
  }

  //for upvoting discussion: click on upvote icon
  const upVoteDiscussion = async () => {
    try {
      console.log("Upvoting discussion ID:", discussionId);
      console.log("User ID:", userId);

      const { data } = await axiosInstance.put(
        `/api/discussions/upvote/${discussionId}`,
        {
          userId,
        }
      );

      console.log("Upvoted discussion:", data);
    } catch (error) {
      console.error("Error upvoting discussion:", error);
    }
  };

  //for saving discussion: click on bookmark icon
  const saveDiscussionApi = async () => {
    try {
      console.log("Saving discussion ID:", discussionId);
      console.log("User ID:", userId);

      const { data } = await axiosInstance.put(
        `/api/user/save_discussion/${discussionId}`,
        {
          userId,
        }
      );
      console.log("Saved discussion:", data);
      setHasSavedDiscussion(data.userHasSavedDiscussionApi);
    } catch (error) {
      console.error("Error saving discussion:", error);
    }
  };

  if (!discussion) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  //const errors = {};
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
                  <p className="text-sb2">
                    {formatDistanceToNow(new Date(discussion.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="other-detail flex gap-x-1">
                  <p className="text-sb1">{discussion.replies.length}</p>
                  <p className="text-sb2">
                    {discussion.replies.length === 1 ? "reply" : "replies"}
                  </p>
                </div>
              </div>
            </div>

            <Link to="/create_discussion">
              <Button className="border border-primary_light text-primary_light rounded-lg w-fit px-6 py-2 text-sm font-medium ">
                Start Discussion
              </Button>
            </Link>
          </div>

          <div className="bottom flex flex-col lg:flex-row py-8 gap-x-8 gap-y-8">
            <div className="bottom-left flex flex-col flex-1 gap-y-12 ">
              <div className="bottom-left-1 flex flex-1">
                <div className="discussion-card flex flex-1 pl-8 pb-3 pr-3 gap-x-4 border-b">
                  <div className="votes-save-div flex flex-col gap-y-2 items-center">
                    <div className="votes-save-div flex flex-col gap-y-2 items-center">
                      <CircleChevronUp
                        size={28}
                        className="-mt-1"
                        onClick={upVoteDiscussion}
                        color={UserHasUpvoted ? "#57A2FF" : "#191A23"}
                      />
                      <p className="text-b3">{discussion.upvotes.length}</p>
                    </div>
                    <Bookmark
                      size={28}
                      onClick={saveDiscussionApi}
                      color={hasSavedDiscussion ? "#57A2FF" : "#191A23"}
                    />
                  </div>

                  <div className="discussion-card-right flex flex-col flex-1 gap-y-2">
                    <div className="title-and-sub flex flex-col gap-y-1">
                      <h5 className="text-t3">{discussion.title}</h5>
                      <p className="text-b4">{discussion.description}</p>
                    </div>
                    <div className="other-details flex justify-between items-center">
                      <p className="tag py-1 px-3 bg-background_alt_light text-b3">
                        {discussion.tag}
                      </p>
                      {discussion.user === userId && (
                        <Popover className="">
                          <PopoverTrigger>
                            <CircleEllipsis size={16} />
                          </PopoverTrigger>
                          <PopoverContent className="bg-background_light w-54">
                            <div className="popup-list flex flex-col gap-y-4 bg-background_light">
                              <Link to={`/edit_discussion/${discussion._id}`}>
                                <p className="text-b4 cursor-pointer">Edit</p>
                              </Link>
                              <p className="text-b4 cursor-pointer">Delete</p>
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-left-2 flex-1">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="bg-Neutral400 w-full flex flex-col rounded gap-y-4 border border-rounded border-border_light p-4"
                >
                  <textarea
                    {...register("reply")}
                    type="reply"
                    placeholder="Add to the discussion"
                    className={`textarea-input h-32 w-full rounded border focus:outline pl-4 pt-2 placeholder-gray-500 placeholder-opacity-75 ${
                      errors.reply ? "error-class border-destructive" : ""
                    }`}
                  />
                  {errors.textarea && (
                    <p className="error-response text-b4 text-destructive_light">
                      {errors.reply.message}
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`button-class ${
                      isSubmitting
                        ? "bg-primary_light bg-opacity-70 w-fit text-text_light pt-4 pr-6 pb-4 pl-6 rounded text-lg font-medium"
                        : "bg-primary_light w-fit text-text_light pt-3 pr-4 pb-3 pl-4 md:pt-4 md:pr-6 md:pb-4 md:pl-6 rounded font-medium text-sm md:text-lg"
                    }`}
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
                  <div className="flex gap-x-2">
                    <p className="text-t1">{discussion.replies.length}</p>
                    <p className="text-t1">
                      {discussion.replies.length === 1 ? "reply" : "replies"}
                    </p>
                  </div>

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
                <div className="reply-card flex flex-1 pb-3 pr-3 gap-x-4 border-b">
                  <div className="flex flex-col flex-1 gap-y-2">
                    {discussion.replies.map((reply) => (
                      <div
                        className="reply-card flex flex-1 pb-3 pr-3 gap-x-4 border-b"
                        key={reply._id}
                      >
                        <div className="votes-div flex flex-col gap-y-2 items-center">
                          <CircleChevronUp size={32} className="-mt-1" />
                          <p className="text-b3">
                            {reply.upvotes.length === 0
                              ? 0
                              : reply.upvotes.length}
                          </p>
                        </div>
                        <div
                          className="reply-card-right flex flex-col gap-y-2"
                          key={reply._id}
                        >
                          <div className="top-details flex justify-between items-center">
                            <div className="flex gap-x-2 items-center">
                              <div className="h-6 w-6 bg-background_alt_light rounded"></div>
                              <p className="text-sb1">
                                {reply.userDisplayName}
                              </p>
                            </div>
                          </div>
                          <p className="text-b4">{reply.content}</p>
                          <div className="bottom-details flex items-center gap-x-6">
                            <p className="text-b5">
                              {format(
                                new Date(reply.createdAt),
                                "MMMM d 'at' HH:mm"
                              )}
                            </p>
                            <div className="flex gap-x-1 items-center">
                              <Reply size={16} />
                              <p className="text-sb1">Reply</p>
                            </div>
                          </div>
                          {reply.replies.length > 0 &&
                            reply.replies.map((reply) => (
                              <div className="" key={reply._id}>
                                <p className="text-b4">{reply.content}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
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
