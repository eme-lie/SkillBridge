import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidenavbar from "@/components/Sidenavbar";
import axios from "axios";
import { useAuthContext } from "../hooks/authHook";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar.jsx";
const SavedDiscussions = () => {
  const [savedDiscussions, setSavedDiscussions] = useState([]);
  const {
    state: { user },
  } = useAuthContext();
  useEffect(() => {
    const fetchSavedDiscussions = async () => {
      const { data } = await axios.get("/api/user/saved_discussions", {
        params: { userId: user.id },
      });

      if (user.id) {
        setSavedDiscussions(data);
      }
    };
    fetchSavedDiscussions();
  }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="main-container flex flex-row lg:pt-4 lg:pr-16 lg:pl-4 ">
        <Sidenavbar />
        <div className="right-container py-16 pl-20 flex flex-col gap-y-8">
          <h1 className="text-h1">Your Saved Discussions</h1>
          {savedDiscussions.map((discussion) => (
            <div
              key={discussion.id}
              className="discussion-card flex pl-1 pt-2 pb-2 pr-2 gap-x-3 lg:pl-8 lg:pt-3 lg:pb-3 lg:pr-3 gap-x-6 border-t border-b"
            >
              <div className="discussion-card-left flex flex-col gap-y-2">
                <div className="votes-container flex gap-x-1 items-center">
                  <p className="text-b3">{discussion.upvotes.length}</p>
                  <p className="text-b4">
                    {discussion.upvotes.length === 1 ? "vote" : "votes"}
                  </p>
                </div>
                <div className="replies-container flex gap-x-1 items-center">
                  <p className="text-b3">{discussion.replies.length}</p>
                  <p className="text-b4">
                    {discussion.replies.length === 1 ? "reply" : "replies"}
                  </p>
                </div>
              </div>
              <div className="discussion-card-right flex flex-1 flex-col gap-y-2">
                <div className="title-and-sub flex flex-col gap-y-1">
                  <Link to={`/discussions/${discussion._id}`}>
                    <h5 className="text-t3 hover:text-primary_light">
                      {discussion.title}
                    </h5>
                  </Link>

                  <p className="text-b4">{discussion.description}</p>
                </div>
                <div className="other-details flex justify-between items-center">
                  <p className="tag py-1 px-1 lg:px-3 bg-background_alt_light text-b3">
                    {discussion.tag}
                  </p>
                  <div className="other-details-right flex flex-row gap-x-4">
                    <div className="other-details-right-1 flex gap-x-1 items-center">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <p className="text-sb1">Emelie Obiora</p>
                    </div>

                    <div className="other-details-right-2 flex gap-x-1">
                      <p className="text-sb1">
                        {formatDistanceToNow(new Date(discussion.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedDiscussions;
