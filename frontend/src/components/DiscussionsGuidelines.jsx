import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/accordion";

const DiscussionsGuidelines = () => {
  return (
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
            <p className="text-sb1">Share perspectives, advice, and insights</p>
          </AccordionTrigger>
          <AccordionContent>
            <p className="pl-4 pr-4 pt-1 text-sb1">
              Use Discussions to engage in deeper dialogue, have opinion-based
              conversations, and exchange perspectives about a technical
              concept. See full Discussions guidelines.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion className="Sector border-l border-r" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="pl-4 pr-4">
            <p className="text-sb1">Be welcoming and patient</p>
          </AccordionTrigger>
          <AccordionContent>
            <p className="pl-4 pr-4 pt-1 text-sb1">
              All users are expected to treat one another with kindness and
              respect. Remember, everyone is here to learn, and sometimes while
              learning, people make mistakes. See code of conduct.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion className="Sector border-l border-r" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="pl-4 pr-4">
            <p className="text-sb1 ">No resume or job listings</p>
          </AccordionTrigger>
          <AccordionContent>
            <p className="pl-4 pr-4 pt-1 text-sb1">
              Discussions are not for sharing your resume or job listing.
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
              If your post happens to be about your product or website, you must
              disclose your affiliation. See spam guidelines and best practices.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DiscussionsGuidelines;
