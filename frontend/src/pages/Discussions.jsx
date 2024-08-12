import DiscussionsGuidelines from "@/components/DiscussionsGuidelines";
import Sidenavbar from "@/components/Sidenavbar";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import {
  SlidersHorizontal,
  Info,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover.jsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar.jsx";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const Discussions = () => {
  const [tags, setTags] = useState([]);
  const [discussions, setDiscussions] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(
    searchParams.get("sort") || "createdAt,desc"
  );
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [tag, setTag] = useState(searchParams.get("tag") || "");
  const [limit, setLimit] = useState(searchParams.get("limit") || 10);
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await axios.get("/api/filters/tags");
      console.log(data);
      setTags(data);
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchDiscussions = async () => {
      const queryParams = new URLSearchParams();

      if (page > 1) queryParams.append("page", page);
      if (limit !== 10) queryParams.append("limit", limit);
      if (search) queryParams.append("search", search);
      if (sort !== "createdAt,desc") queryParams.append("sort", sort);
      if (tag) queryParams.append("tag", tag);

      setSearchParams(queryParams); // Update the URL search parameters

      const response = await axios.get(
        `/api/discussions?${queryParams.toString()}`
      );

      const data = response.data;
      console.log(data);

      setDiscussions(data.discussions);
      setTotal(data.total);
    };

    fetchDiscussions();
  }, [page, limit, search, sort, tag]);

  const handleClearFilters = () => {
    setSearch("");
    setSort("createdAt,desc");
    setTag("");
    setPage(1);
    setLimit(10);
  };

  const handleFilterToggle = (filterType, value) => {
    switch (filterType) {
      case "tag":
        setTag(tag === value ? "" : value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="main-container flex flex-row md:pt-4 md:pr-8 md:pl-4 lg:pt-4 lg:pr-16 lg:pl-4">
        <Sidenavbar />
        <div className="right-container flex flex-col flex-1 px-4 py-4">
          <div className="flex items-center justify-between border-b border-b-border_light pb-4">
            <div className="flex flex-col gap-y-1">
              <h1 className="text-h2">Discussion</h1>
              <div className="flex gap-x-2">
                <Info size={14} />
                <p className="text-sb1">Discussions</p>
              </div>
            </div>

            <Link to="/create_discussion">
              <Button className="bg-primary_light text-text_light rounded-lg w-fit px-6 py-2 text-sm font-medium">
                Create Discussion
              </Button>
            </Link>
          </div>

          <div className="bottom flex flex-col lg:flex-row py-8 gap-x-8 gap-y-8">
            <div className="bottom-left flex-1 gap-y-4 flex flex-col">
              <div className="bottom-left-top flex flex-col lg:flex-row lg:items-center justify-between  ">
                <p className="text-t1">{`${total} Discussions`}</p>
                <div className="bottom-left-top-right flex gap-x-2">
                  <div className="sort flex gap-x-2 items-center">
                    <p className="text-b5 text-text_light">Sort by:</p>

                    <select
                      className="border border-border_light py-2 pr-3 rounded-lg h-10 text-b5 text-text_light"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
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
                        <div className="flex flex-col h-24 overflow-y-auto scrollbar-hide gap-y-1">
                          {tags.map((tag) => (
                            <span
                              className={`cursor-pointer ${
                                tag === tag.name
                                  ? "text-primary_light"
                                  : "text-text_light"
                              } mx-2.5`}
                              key={tag._id}
                              onClick={() =>
                                handleFilterToggle("tag", tag.name)
                              }
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <p
                      className="text-destructive_light cursor-pointer text-b5"
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </p>
                  </div>
                </div>
              </div>
              <Input
                className=""
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="bottom-left-center flex flex-col mt-4 ">
                {discussions.map((discussion) => (
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
                          {discussion.replies.length === 1
                            ? "reply"
                            : "replies"}
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
                              {formatDistanceToNow(
                                new Date(discussion.createdAt),
                                { addSuffix: true }
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bottom-left-bottom flex justify-center gap-x-6">
                <div
                  className="previous-container flex items-center gap-x-2 cursor-pointer"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft size={20} />
                  <p className="text-b2">Previous</p>
                </div>
                <span className="bg-background_alt_light flex items-center justify-center rounded-2xl h-8 w-8">
                  {page}
                </span>
                <div
                  className="next-container flex items-center gap-x-2 cursor-pointer"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page * limit >= total}
                >
                  <p className="text-b2">Next</p>
                  <ChevronRight size={20} />
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
