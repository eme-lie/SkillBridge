import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
//import dotenv from "dotenv";
//dotenv.config();

//const BASE_API_URL = process.env.REACT_APP_BASE_API_URL || 5000; // Assuming you've defined REACT_APP_BASE_API_URL in your .env file

// Your existing code that uses BASE_API_URL || 5000;

import axios from "axios";

const Internships = () => {
  const [locations, setLocations] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [sector, setSector] = useState(searchParams.get("sector") || "");
  const [employer, setEmployer] = useState(searchParams.get("employer") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState(
    searchParams.get("sort") || "createdAt,desc"
  );

  const [internships, setInternships] = useState([]);
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [limit, setLimit] = useState(parseInt(searchParams.get("limit")) || 10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchFilters = async () => {
      const locationsResponse = await axios.get(
        `http://localhost:4000/api/filters/locations`
      );
      const sectorsResponse = await axios.get(
        `http://localhost:4000/api/filters/sectors`
      );
      const employersResponse = await axios.get(
        `http://localhost:4000/api/filters/employers`
      );

      /*const [locationsResponse, sectorsResponse, employersResponse] =
        await Promise.all([
          axios.get(`http://localhost:4000/api/filters/locations`),
          axios.get(`http://localhost:4000/api/filters/sectors`),
          axios.get(`http://localhost:4000/api/filters/employers`),
        ]);*/

      setLocations(await locationsResponse.data);
      setSectors(await sectorsResponse.data);
      setEmployers(await employersResponse.data);
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchInternships = async () => {
      const queryParams = new URLSearchParams();

      if (page > 1) queryParams.append("page", page);
      if (limit !== 10) queryParams.append("limit", limit);
      if (search) queryParams.append("search", search);
      if (sort !== "createdAt,desc") queryParams.append("sort", sort);
      if (location) queryParams.append("location", location);
      if (sector) queryParams.append("sector", sector);
      if (employer) queryParams.append("employer", employer);

      const response = await fetch(
        `/api/internships?${queryParams.toString()}`
      );
      const data = await response.json();

      setInternships(data.internships);
      setTotal(data.total);
    };

    fetchInternships();
  }, [page, limit, search, sort, location, sector, employer]);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (page > 1) queryParams.append("page", page);
    if (limit !== 10) queryParams.append("limit", limit);
    if (search) queryParams.append("search", search);
    if (sort !== "createdAt,desc") queryParams.append("sort", sort);
    if (location) queryParams.append("location", location);
    if (sector) queryParams.append("sector", sector);
    if (employer) queryParams.append("employer", employer);

    setSearchParams(queryParams);
  }, [page, limit, search, sort, location, sector, employer]);

  const handleClearFilters = () => {
    setSearch("");
    setSort("createdAt,desc");
    setLocation("");
    setSector("");
    setEmployer("");
    setPage(1);
    setLimit(10);
  };

  const handleFilterToggle = (filterType, value) => {
    switch (filterType) {
      case "location":
        setLocation(location === value ? "" : value);
        break;
      case "sector":
        setSector(sector === value ? "" : value);
        break;
      case "employer":
        setEmployer(employer === value ? "" : value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Internships</h1>

      <div>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          <h3>Locations</h3>
          {locations.map((loc) => (
            <span
              key={loc._id}
              onClick={() => handleFilterToggle("location", loc.name)}
              style={{
                cursor: "pointer",
                textDecoration: location === loc.name ? "underline" : "none",
                margin: "0 10px",
              }}
            >
              {loc.name}
            </span>
          ))}
        </div>

        <div>
          <h3>Sectors</h3>
          {sectors.map((sec) => (
            <span
              key={sec._id}
              onClick={() => handleFilterToggle("sector", sec.name)}
              style={{
                cursor: "pointer",
                textDecoration: sector === sec.name ? "underline" : "none",
                margin: "0 10px",
              }}
            >
              {sec.name}
            </span>
          ))}
        </div>

        <div>
          <h3>Employers</h3>
          {employers.map((emp) => (
            <span
              key={emp._id}
              onClick={() => handleFilterToggle("employer", emp.name)}
              style={{
                cursor: "pointer",
                textDecoration: employer === emp.name ? "underline" : "none",
                margin: "0 10px",
              }}
            >
              {emp.name}
            </span>
          ))}
        </div>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="createdAt,desc">Newest First</option>
          <option value="createdAt,asc">Oldest First</option>
          <option value="title,asc">Title A-Z</option>
          <option value="title,desc">Title Z-A</option>
        </select>
      </div>

      <button onClick={handleClearFilters}>Clear Filters</button>

      <div>
        {internships.map((internship) => (
          <div key={internship._id}>
            <h2>{internship.title}</h2>
            <p>{internship.location}</p>
            <p>{internship.sector}</p>
            <p>{internship.employer}</p>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>{page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page * limit >= total}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Internships;
