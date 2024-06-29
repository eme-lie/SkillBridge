import { useEffect, useState } from "react";

import axios from "axios";

const Internships = () => {
  const [internships, setInternships] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/internships");
      console.log(data);
      setInternships(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Internships</h1>
      <ul>
        {internships.map((internship) => (
          <li key={internship._id}>
            <p className="font-bold text-3xl">{internship.title}</p>
            <p className="text-3xl">{internship._id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Internships;
