import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Navbar from "./Navbar";

import {
  SlidersHorizontal,
  MapPin,
  Calendar,
  Bookmark,
  /*BookmarkCheck,*/
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      <Navbar />
      <div className="main-container flex flex-row lg:pt-4 lg:pr-16 lg:pl-16 gap-x-16 ">
        <div className=" menubar flex flex-col w-45 gap-y-4 ">
          <Input
            className=""
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="filters flex flex-col gap-y-2">
            <Accordion className="location" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <p className="text-b3">Locations</p>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col h-24 overflow-y-auto scrollbar-hide gap-y-1">
                    {locations.map((loc) => (
                      <span
                        className={`cursor-pointer ${
                          location === loc.name
                            ? "text-primary_light"
                            : "text-text_light"
                        } mx-2.5`}
                        key={loc._id}
                        onClick={() => handleFilterToggle("location", loc.name)}
                      >
                        {loc.name}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion className="Sector" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <p className="text-b3">Sectors</p>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col h-24 overflow-y-auto scrollbar-hide gap-y-1">
                    {sectors.map((sec) => (
                      <span
                        className={`cursor-pointer ${
                          sector === sec.name
                            ? "text-primary_light"
                            : "text-text_light"
                        } mx-2.5`}
                        key={sec._id}
                        onClick={() => handleFilterToggle("sector", sec.name)}
                      >
                        {sec.name}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion className="Sector" type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <p className="text-b3">Employers</p>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col h-24 overflow-y-auto scrollbar-hide gap-y-1">
                    {employers.map((emp) => (
                      <span
                        className={`cursor-pointer ${
                          employer === emp.name
                            ? "text-primary_light"
                            : "text-text_light"
                        } mx-2.5`}
                        key={emp._id}
                        onClick={() => handleFilterToggle("employer", emp.name)}
                      >
                        {emp.name}
                      </span>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="right-side flex flex-col gap-y-4 w-55">
          <div className="right-side-top flex justify-between">
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
                <option className="text-b5 text-text_light" value="title,asc">
                  Title A-Z
                </option>
                <option className="text-b5 text-text_light" value="title,desc">
                  Title Z-A
                </option>
              </select>
            </div>
            <div className="clear-show-filters flex gap-x-2 items-center">
              <p
                className="text-destructive_light cursor-pointer text-b5"
                onClick={handleClearFilters}
              >
                Clear Filters
              </p>
              <Sheet className="bg-background_light flex flex-col h-full">
                <SheetTrigger>
                  <div className="filters-toggle-mobile-view flex gap-x-1 border rounded-lg items-center py-2 px-2 border-primary_light border-opacity-50">
                    <SlidersHorizontal className="w-4 h-4" />
                    <p className="filters-toggle-mobile-view-text cursor-pointer text-b3">
                      Filters
                    </p>
                  </div>
                </SheetTrigger>
                <SheetContent className="bg-background_light flex flex-col h-full">
                  <SheetHeader className="flex flex-col h-full">
                    <SheetTitle className="text-b3">Filters</SheetTitle>
                    <SheetDescription className="flex flex-col justify-between h-full">
                      <div className="filters flex flex-col gap-y-2">
                        <Accordion
                          className="location"
                          type="single"
                          collapsible
                        >
                          <AccordionItem value="item-1">
                            <AccordionTrigger>
                              <p className="text-b3">Locations</p>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="flex flex-col h-24 overflow-y-auto scrollbar-hide gap-y-1">
                                {locations.map((loc) => (
                                  <span
                                    className={`cursor-pointer ${
                                      location === loc.name
                                        ? "text-primary_light"
                                        : "text-text_light"
                                    } mx-2.5`}
                                    key={loc._id}
                                    onClick={() =>
                                      handleFilterToggle("location", loc.name)
                                    }
                                  >
                                    {loc.name}
                                  </span>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        <Accordion className="Sector" type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger>
                              <p className="text-b3">Sectors</p>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="flex flex-col h-24 overflow-y-auto scrollbar-hide gap-y-1">
                                {sectors.map((sec) => (
                                  <span
                                    className={`cursor-pointer ${
                                      sector === sec.name
                                        ? "text-primary_light"
                                        : "text-text_light"
                                    } mx-2.5`}
                                    key={sec._id}
                                    onClick={() =>
                                      handleFilterToggle("sector", sec.name)
                                    }
                                  >
                                    {sec.name}
                                  </span>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        <Accordion className="Sector" type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger>
                              <p className="text-b3">Employers</p>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="flex flex-col h-24 overflow-y-auto scrollbar-hide gap-y-1">
                                {employers.map((emp) => (
                                  <span
                                    className={`cursor-pointer ${
                                      employer === emp.name
                                        ? "text-primary_light"
                                        : "text-text_light"
                                    } mx-2.5`}
                                    key={emp._id}
                                    onClick={() =>
                                      handleFilterToggle("employer", emp.name)
                                    }
                                  >
                                    {emp.name}
                                  </span>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                      <div className="filter-mobile-view-footer flex shadow-custom2 h-8 items-center px-2 justify-end mt-16">
                        <p
                          className="text-destructive_light cursor-pointer text-b5"
                          onClick={handleClearFilters}
                        >
                          Clear Filters
                        </p>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="internships flex flex-col gap-y-4">
            {internships.map((internship) => (
              <div
                className="flex flex-col border border-border_light pt-4 pr-8 pb-4 pl-8 rounded-lg hover:bg-hover_light cursor-pointer justify-between"
                key={internship._id}
              >
                <div className="flex internship-top justify-between items-center">
                  <h3 className="text-t1 hover:text-primary_light cursor-pointer ">
                    {internship.title}
                  </h3>
                  {/* <BookmarkCheck className="primary_light w-8 />  */}

                  <Bookmark className="icon_light w-8" />
                </div>
                <div className="internship-bottom flex gap-x-4">
                  <img className="w-20 h-20" src={internship.logo} alt="" />
                  <div className="internship-left-bottom-right flex flex-col gap-y-1 justify-center">
                    <p className="text-b4 text-primary_light">
                      {internship.employer}
                    </p>
                    <div className="flex gap-x-1 items-center">
                      <MapPin className="icon_light w-4" />

                      <p className="text-b4 text-text_light">
                        {internship.location}
                      </p>
                    </div>
                    <div className="flex gap-x-1 items-center">
                      <Calendar className="icon_light w-4" />

                      <p className="text-b4 text-text_light">
                        {new Date(internship.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
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
      </div>
    </div>
  );
};

export default Internships;
