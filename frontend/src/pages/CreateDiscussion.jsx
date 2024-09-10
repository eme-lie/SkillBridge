import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Sidenavbar from "../components/Sidenavbar";
import Navbar from "../components/Navbar";
import {
  ChevronLeft,

  /*BookmarkCheck,*/
} from "lucide-react";
import DiscussionsGuidelines from "@/components/DiscussionsGuidelines";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { useAuthContext } from "../hooks/authHook";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CreateDiscussion = () => {
  const { id: discussionId } = useParams();
  useEffect(() => {
    const fetchDiscussion = async () => {
      if (discussionId) {
        const { data } = await axiosInstance.get(
          `/api/discussions/${discussionId}`
        );
        console.log(data);
        // Set form values to the discussion data
        form.setValue("title", data.title);
        form.setValue("description", data.description);
        form.setValue("tag", data.tag);
      }
    };
    fetchDiscussion();
  }, []);

  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [formSchema, setFormSchema] = useState(
    z.object({
      title: z
        .string()
        .min(1, { message: "title is required" })
        .max(100, { message: "title is too long" }),
      description: z
        .string()
        .min(20, { message: "description must be at least 20 characters" }),
      tag: z.string(), // placeholder
    })
  );

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await axiosInstance.get("/api/filters/tags");
      console.log(data);
      setTags(data);

      setFormSchema(
        z.object({
          title: z
            .string()
            .min(1, { message: "title is required" })
            .max(100, { message: "title is too long" }),
          description: z
            .string()
            .min(8, { message: "description must be at least 8 characters" }),
          tag: z.enum(
            data.map((tag) => tag.name),
            {
              message: "tag is required",
            }
          ),
        })
      );
    };

    fetchTags();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    //setError,
    formState: { errors, isSubmitting },
  } = form;
  const {
    state: { user },
  } = useAuthContext();

  const onSubmit = async (data) => {
    // Add user ID to the data object
    const requestData = {
      ...data,
      user: user.id,
      userDisplayName: user.userDisplayName,
    };

    try {
      if (discussionId) {
        const response = await axiosInstance.put(
          `/api/discussions/edit_discussion/${discussionId}`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response) {
          console.log(response.error);
        } else {
          console.log(response.data);
          navigate("/discussions");
        }
        return;
      }
      const response = await axiosInstance.post(
        "/api/discussions",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response) {
        console.log(response.error);
      } else {
        console.log(response.data);
        navigate("/discussions");
      }
    } catch (error) {
      console.error("Error creating discussion:", error);
    }
  };

  if (!tags) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="main-container flex flex-row lg:pt-4 lg:pr-16 lg:pl-4">
        <Sidenavbar />
        <div className="right-container flex flex-col flex-1 px-4 py-4">
          <div className="top flex flex-col h-16 gap-y-4 py-8 border-b border-b-border_light flex-1">
            <Link to="/discussions">
              <div className="top-top flex gap-x-2 items-center">
                <ChevronLeft size={14} />
                <p className="text-sb1">Discussions</p>
              </div>
            </Link>

            <h1 className="text-h2">Create New Discussion</h1>
          </div>
          <div className="bottom flex flex-col lg:flex-row py-8 gap-x-8 gap-y-8">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="bottom-left bg-Neutral400 lg:w-55 flex flex-col flex-1 rounded-tl rounded-bl"
            >
              <div className="main-form bg-Neutral400 flex flex-col flex-1 gap-y-8">
                <div className="inputs flex flex-col gap-y-4 flex-1">
                  <div className="title-input-and-error flex flex-col flex-1 gap-y-2">
                    <div className="label-and-sub-label flex flex-col gap-y-1">
                      <label className="text-t1">Title</label>
                      <div className="flex justify-between gap-x-4">
                        <p className="text-sb1 max-w-6xl">
                          What’s your discussion topic? Be specific and imagine
                          you’re speaking with another person.
                        </p>
                        <p className="text-sb1 w-56">0 / 130 characters</p>
                      </div>
                    </div>
                    <input
                      {...register("title")}
                      type="title"
                      placeholder="Enter a title"
                      className={`title-input h-8 w-full rounded border border-solid focus:border-primary_light text-sb1 pl-4 placeholder:text-sb1 ${
                        errors.title ? "error-class border-destructive" : ""
                      }`}
                    />
                    {errors.title && (
                      <p className="error-response text-b4 text-destructive_light">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="taganddropdown flex flex-col gap-y-1">
                    <div className="label-and-sub-label flex flex-col gap-y-1">
                      <label className="text-t1">Tag</label>
                      <p className="text-sb1">
                        Add a tag to describe what your discussion is about.
                      </p>
                    </div>
                    <select
                      {...register("tag")}
                      placeholder="Select tag"
                      className={`title-input h-8 w-full rounded border border-solid focus:border-primary_light text-Neutral900_Text_main pr-4 pl-4 text-sb1 ${
                        errors.tag ? "error-class border-destructive" : ""
                      }`}
                    >
                      {tags.map((tag) => (
                        <option key={tag._id} value={tag.name}>
                          {tag.name}
                        </option>
                      ))}
                    </select>

                    {errors.tag && (
                      <p className="error-response text-destructive_light text-b4">
                        {errors.tag.message}
                      </p>
                    )}
                  </div>

                  <div className="input-and-error flex flex-col gap-y-1">
                    <label className="text-t1">Description</label>
                    <textarea
                      {...register("description")}
                      type="text"
                      placeholder="Description"
                      className={`description-input h-32 w-full rounded border focus:outline pl-4 pt-2 placeholder-gray-500 placeholder-opacity-75 ${
                        errors.description
                          ? "error-class border-destructive"
                          : ""
                      }`}
                    />
                    {errors.description && (
                      <p className="error-response text-b4 text-destructive_light">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`button-class ${
                    isSubmitting
                      ? "bg-primary_light bg-opacity-70 w-fit text-text_light pt-4 pr-6 pb-4 pl-6 rounded text-lg font-medium"
                      : "bg-primary_light w-fit text-text_light pt-3 pr-4 pb-3 pl-4 md:pt-4 md:pr-6 md:pb-4 md:pl-6 rounded font-medium text-sm md:text-lg"
                  }`}
                >
                  {discussionId ? "Edit Discussion" : "Create Discussion"}
                </Button>

                {/* Render general error message */}
                {errors._general && (
                  <p className="error-response text-destructive_light text-b4 mt-2">
                    {errors._general.message}
                  </p>
                )}
              </div>
            </form>
            <DiscussionsGuidelines />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDiscussion;
