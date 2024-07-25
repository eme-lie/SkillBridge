import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Sidenavbar from "./Sidenavbar";
import Navbar from "./Navbar";
import {
  ChevronLeft,

  /*BookmarkCheck,*/
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";

const tags = ["Leadership", "Communication"];

const Discussions = () => {
  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: "title is required" })
      .max(100, { message: "title is too long" }),
    description: z
      .string()
      .min(8, { message: "description must be at least 8 characters" }),
    tag: z.enum(tags, {
      message: "tag is required",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    //setError,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = () => {};

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="main-container flex flex-row lg:pt-4 lg:pr-16 lg:pl-4">
        <Sidenavbar />
        <div className="right-container flex flex-col flex-1 px-4 py-4">
          <div className="top flex flex-col h-16 gap-y-4 py-8 border-b border-b-border_light flex-1">
            <div className="top-top flex gap-x-2 items-center">
              <ChevronLeft size={14} />
              <p className="text-sb1">Discussions</p>
            </div>
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
                      <div className="flex justify-between">
                        <p className="text-sb1">
                          What’s your discussion topic? Be specific and imagine
                          you’re speaking with another person.
                        </p>
                        <p className="text-sb1">0 / 130 characters</p>
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
                      <option value="">Select tag</option>
                      {tags.map((tag) => (
                        <option key={tag} value={tag}>
                          {tag}
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
                    <input
                      {...register("description")}
                      type="description"
                      placeholder="Description"
                      className={`description-input h-8 w-full rounded border  border-solid focus:border-primary_light text-sb1 pl-4 placeholder:text-sb1 ${
                        errors.description
                          ? "error-class border-destructive"
                          : ""
                      }`}
                    />
                    {errors.description && (
                      <p className="error-response text-destructive_light text-b4">
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
                  Post Discussion
                </Button>

                {/* Render general error message */}
                {errors._general && (
                  <p className="error-response text-destructive_light text-b4 mt-2">
                    {errors._general.message}
                  </p>
                )}
              </div>
            </form>
            <div className="bottom-right flex flex-col h-fit rounded-lg lg:w-35 ">
              <title className="flex py-4 pl-4 pr-32 bg-border_light text-t3 rounded-tr-lg rounded-tl-lg">
                Discussions guidelines
              </title>
              <Accordion
                className="location border-l border-r"
                type="single"
                collapsible
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="pl-4 pr-4">
                    <p className="text-sb1">
                      Share perspectives, advice, and insights
                    </p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pl-4 pr-4 pt-1 text-sb1">
                      Use Discussions to engage in deeper dialogue, have
                      opinion-based conversations, and exchange perspectives
                      about a technical concept. See full Discussions
                      guidelines.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion
                className="Sector border-l border-r"
                type="single"
                collapsible
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="pl-4 pr-4">
                    <p className="text-sb1">Be welcoming and patient</p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pl-4 pr-4 pt-1 text-sb1">
                      All users are expected to treat one another with kindness
                      and respect. Remember, everyone is here to learn, and
                      sometimes while learning, people make mistakes. See code
                      of conduct.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion
                className="Sector border-l border-r"
                type="single"
                collapsible
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="pl-4 pr-4">
                    <p className="text-sb1 ">No resume or job listings</p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pl-4 pr-4 pt-1 text-sb1">
                      Discussions are not for sharing your resume or job
                      listing.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion
                className="Sector border-l border-r rounded-b-lg"
                type="single"
                collapsible
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger className="pl-4 pr-4">
                    <p className="text-sb1">Avoid self-promotion</p>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pl-4 pr-4 pt-1 text-sb1">
                      If your post happens to be about your product or website,
                      you must disclose your affiliation. See spam guidelines
                      and best practices.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussions;
