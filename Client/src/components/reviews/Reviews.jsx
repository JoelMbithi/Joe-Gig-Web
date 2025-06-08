import React, { useRef } from "react";
import "./Reviews.scss";
import Review from "../review/Review";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: async () => {
      if (!gigId) throw new Error("gigId is missing");
      const res = await newRequest.get(`/review/getReview/${gigId}`);
      return res.data;
    },
  });

  console.log("Fetched reviews:", data);

  const mutation = useMutation({
    mutationFn: async (review) => {
      return await newRequest.post("/review/createReview", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", gigId]); // Refresh the reviews list

      // Clear the input field and reset the star rating after submission
      if (inputRef.current) inputRef.current.value = "";
      if (selectRef.current) selectRef.current.value = "1";
    },
    onError: (error) => {
      console.error("Error posting review:", error);
    },
  });

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get values from input fields
    const desc = inputRef.current.value.trim();
    const star = selectRef.current.value;

    if (!desc) {
      alert("Please write a review before submitting.");
      return;
    }

    mutation.mutate({ gigId, desc, star });
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading ? (
        "Loading..."
      ) : error ? (
        <p style={{ color: "red" }}>Error fetching reviews: {error.message}</p>
      ) : data.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        data.map((review) => <Review key={review._id} review={review} />)
      )}

      {/* Review Submission Form */}
      <div className="add">
        <form className="addForm" onSubmit={handleSubmit}>
          <input type="text" ref={inputRef} placeholder="Write your opinion" required />
          <select ref={selectRef}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
