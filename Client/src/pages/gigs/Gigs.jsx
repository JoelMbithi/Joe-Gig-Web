import React, { useState, useRef, useEffect } from "react";
import "./Gigs.scss";
import dropDown from "../../assets/down.png";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [open, setOpen] = useState(false); // Controls dropdown visibility
  const [sort, setSort] = useState("sales"); // Default sorting
  const [min, setMin] = useState(""); // Minimum price
  const [max, setMax] = useState(""); // Maximum price

  const minRef = useRef();
  const maxRef = useRef();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category"); // Extract category from URL

  // Fetch gigs based on filters
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs", category, min, max, sort],
    queryFn: () => {
      const queryParams = new URLSearchParams();
      if (category) queryParams.append("category", category);
      if (min) queryParams.append("min", min);
      if (max) queryParams.append("max", max);
      queryParams.append("sort", sort);

      return newRequest.get(`/gigs/getGigs?${queryParams.toString()}`).then((res) => res.data);
    },
    enabled: false, // Fetch manually when filters change
  });

  // Fetch data when filters change
  useEffect(() => {
    refetch();
  }, [sort, min, max, category]); // Include category in dependency array

  // Handle sorting
  const reSort = (type) => {
    setSort(type);
    setOpen(false);
    refetch();
  };

  // Apply min/max price filter
  const applyFilter = () => {
    setMin(minRef.current.value);
    setMax(maxRef.current.value);
  };

  return (
    <div className="gigs">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <span className="intro">JoeGigs {'>'} {category || "All Categories"} {'>'}</span>
        <h1>{category || "All Gigs"}</h1>
        <p>Explore the best gigs in {category || "various categories"}.</p>

        {/* Filtering & Sorting Menu */}
        <div className="menu">
          <div className="leftMenu">
            <span>Budget</span>
            <input type="text" placeholder="min" ref={minRef} />
            <input type="text" placeholder="max" ref={maxRef} />
            <button onClick={applyFilter}>Apply</button>
          </div>

          <div className="rightMenu">
            <span className="sortBy">Sort By</span>
            <span className="sortType">{sort === "sales" ? "Best Selling" : "Newest"}</span>
            <img src={dropDown} alt="dropdown" onClick={() => setOpen(!open)} />
            {open && (
              <div className="dropDownMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Display Gigs */}
        <div className="cards">
          {isLoading
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
