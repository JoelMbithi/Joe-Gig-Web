import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import star from "../../assets/star.png"; 
import heart from "../../assets/heart.png"; 
import "./GigCard.scss"; 
import { useQuery } from '@tanstack/react-query'; 
import noavatar from "../../assets/noavatar.jpg"
import newRequest from '../../utils/newRequest'; 

//display gig item from the gigs
const GigCard = ({ item }) => {
  
  // Fetch user details based on the userId of the gig owner
   // Unique query key to cache user data
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigsUser", item.userId],
    // API call to get user details
    queryFn: () => newRequest.get(`/user/getUser/${item.userId}`).then(res => res.data), 
  });

  // Log user data whenever it updates (useful for debugging)
  useEffect(() => {
    console.log("User data:", data);
  }, [data]);

  return (
<Link to={`/gig/${item._id}`} className="link"> 
  <div className='gigCard'>
    <img src={item.cover} alt={item.title} />
    
    <div className="info">
      {isLoading ? "loading..." 
        : error ? "Something went wrong!" 
        : <div className="user">
            <img src={data?.img || noavatar} alt="User Profile" />
            <span>{data?.username}</span>
          </div>
      }

      {/* Display Gig Title */}
      <h3 className="gig-title">{item.title}</h3> 

      <p>{item.description}</p>

      <div className="star">
        <img src={star} alt="Star Rating" />
        <span>
          {item.starNumber > 0 
            ? Math.min(5, Math.round((item.totalStars / item.starNumber) * 5)) 
            : "No Ratings Yet"}
        </span>
      </div>
    </div>

    <hr /> 

    <div className="details">
      <img src={heart} alt="Favorite" /> 
      <div className="price">
        <span>STARTING AT</span>
        <h2>${item.price}</h2> 
      </div>
    </div>
  </div>
</Link>

  );
};

export default GigCard;
