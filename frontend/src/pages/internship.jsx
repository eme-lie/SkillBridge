import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/ui/button";

const Internship = () => {
  const { id } = useParams();
  const [internship, setInternship] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/internships/${id}`);
      setInternship(data);
      console.log(data);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <h1>{internship.title}</h1>
      <p>{internship.description}</p>
      <div className="gap-x-4 lg:flex">
        <Button className="w-full border border-rounded border-lg">
          Login
        </Button>
        <Button className="w-full bg-primary_light">Sign Up for Free</Button>
      </div>
    </>
  );
};

export default Internship;
