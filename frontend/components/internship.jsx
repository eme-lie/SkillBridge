import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Internship = () => {
  const { id } = useParams();
  const [internship, setInternship] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/internships/${id}`);
      setInternship(data);
      console.log(data);
    };
    fetchData();
  }, [id]);

  return (
    <>
      I<h1>{internship.name}</h1>
      <p>{internship.description}</p>
    </>
  );
};

export default Internship;
