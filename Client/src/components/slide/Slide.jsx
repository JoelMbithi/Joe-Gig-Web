import React from "react";
import "./Slide.scss";
import Slider from "react-slick";
import CategoryCard from "../categoryCard/CategoryCard.jsx";
import ProjectCard from "../projectCard/ProjectCard.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slide = ({ items, type }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: type === "categories" ? 5 : 4, // Different slides count per type
    slidesToScroll: 2,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="slide">
      <div className="container">
        <Slider {...settings}>
          {items.map((item) =>
            type === "categories" ? (
              <CategoryCard item={item} key={item.id} />
            ) : (
              <ProjectCard item={item} key={item.id} />
            )
          )}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
