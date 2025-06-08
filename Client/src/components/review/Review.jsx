import React from "react";
import "./Review.scss";
import { useQuery } from "@tanstack/react-query";
import noavatar from "../../assets/noavatar.jpg";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import star from "../../assets/star.png";
import newRequest from "../../utils/newRequest";

const Review = ({ review }) => {
   //  Prevent errors if review is undefined
  const userId = review?.userId;

  const { isLoading, error, data } = useQuery({
    queryKey: ["reviewUser", userId],
    queryFn: async () => {
      //  Prevents API call if userId is missing
      if (!userId) return null; 
      const res = await newRequest.get(`/user/getUser/${userId}`);
      return res.data;
    },
    //  Ensures the query runs only if userId exists
    enabled: !!userId, 
  });

  return (
    <div className="reviews-container">
      <div className="review">
        {isLoading ? (
          "Loading..."
        ) : error ? (
          <p style={{ color: "red" }}>Error fetching user</p>
        ) : !data ? ( 
          //  Corrected check for missing data
          <p>No user Reviews available.</p>
        ) : (
         <div className="user">
            <img className="profile" src={data.img || noavatar} alt="User" />
            <div className="info">
              <span>{data.username}</span>
              <div className="country">
               
                <span>{data.country}</span>
              </div>
            </div>
          </div>
        )} 

        <div className="stars">
          {Array(review.star)
            .fill()
            .map((_, i) => (
              <img src={star} alt="Star" key={i} />
            ))}
          <span>{review.star}</span>
        </div>
        <p>{review.desc}</p>
        <div className="helpful">
          <img src={like} alt="Like" />
          <span>Yes</span>
          <img src={dislike} alt="Dislike" />
          <span>No</span>
        </div>
      </div>
    </div>
  );
};

export default Review;
