import React from "react";
import "./Gig.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import star from "../../assets/star.png";
import clock from "../../assets/clock.png";
import cycle from "../../assets/recycle.png";
import { useQuery } from "@tanstack/react-query"
import newRequest from "../../utils/newRequest"
import noavatar from "../../assets/noavatar.jpg"
import { Link, useParams } from "react-router-dom"
import greenCheck from "../../assets/greencheck.png";
import Reviews from "../../components/reviews/Reviews";

const gig = () => {

  const {id} = useParams()
 

  //to fetch gig from gigs
  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/gigs/singleGig/${id}`).then((res) => res.data),
  });
  

  const { isLoading:isLoadingUser, error: errorUser, data: dataUser} = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      newRequest.get(`/user/getUser/${data.userId}`).then((res) => res.data),
  });
  


  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 2,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 6000,
  };



  return (
    <div className="gig">
      { isLoading ? "loading" 
      : error ? "something went wrong!"
      : <div className="container">
        <div className="left">
          <span className="breadCrumb">
            JoeGigs {">"} Graphics & Design {">"}
          </span>
          <h1>{data.title}</h1>

          { isLoadingUser ? ("loading"  
          ): error ? ("Something went wrong!"
         ) : (  <div className="user">
            <div className="profile">
            <img src={dataUser.img || {noavatar}} alt=""  />
            </div>

            <span>{dataUser.username}</span>
            {!isNaN(data.totalStars / data.starNumber) &&  (
              <div className="stars">
                {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item,i) => (
                  <img src={star} alt="" key={i} />
                ))}
              
                <span>{Math.round(data.totalStars / data.starNumber)}</span>
             
              </div>
                   )} 
          </div>
        )}
          <Slider {...settings} className="slider">
            {data.images.map((img) => (
              <img
              key={img}
              src={img}
              alt=""
              />
            ))}
            
          </Slider>

          <h2>About This Gig</h2>
          <p>
           {data.desc}
          </p>

          {isLoadingUser ? ("loading" 
         ) : error ? ("Something went wrong!"
          ) : ( <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img src={dataUser.img || {noavatar}} alt=""  />
              <div className="info">
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) &&  (
              <div className="stars">
                {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item,i) => (
                  <img src={star} alt="" key={i} />
                ))}
              
                <span>{Math.round(data.totalStars / data.starNumber)}</span>
             
              </div>
                   )} 
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser.country}</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">5 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
               {dataUser.description}
              </p>
            </div>
          </div>
          )}

          {/* Reviews */}

        <Reviews gigId={id} />
          
        </div>

        <div className="right">
          <div className="price">
            <h3>{data.shortTitle}</h3>
            <h2>$ {data.price}</h2>
          </div>
          <p>
           {data.desc}
          </p>
          <div className="details">
            <div className="item">
              <img src={clock} alt="" />
              <span>{data.deliveryDate} days Delivery</span>
            </div>
            <div className="item">
              <img src={cycle} alt="" />
              <span>{data.revisionNumber} Revision</span>
            </div>
          </div>
          <div className="features">
          {data.features.map((feature, index) => (
    <div className="item" key={index}>
      <img src={greenCheck} alt="" />
      <span>{feature}</span>
    </div>
  ))}
            
           
    
          </div>
          <Link to={`/pay/${id}`}>
          <button>Continue</button>
          </Link>
        </div>
      </div>}
    </div>
  );
};

export default gig;
