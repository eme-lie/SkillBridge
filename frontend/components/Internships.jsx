import { useEffect, useState } from "react";

import axios from "axios";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/internships");
      setInternships(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Internships</h1>
      <ul>
        {internships.map((internship) => (
          <li key={internship._id}>{internship.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Internships;
