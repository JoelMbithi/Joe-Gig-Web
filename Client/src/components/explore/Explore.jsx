import React from "react";
import "./Explore.scss";
import check from "../../assets/check.png";

const Explore = () => {
  return (
    <div className="explore">
      <div className="container">
        <div className="leftItem">
          <h1>
          JoeGigs <i>business</i>
          </h1>
          <div className="item">
          <h1>
                A Business Solution Designed for <i>High-Performing Teams</i>
              </h1>
              <p>
                Experience a seamless integration of tools and resources that are crafted to help your team perform at its best and achieve long-term success.
              </p>
              <div className="title">
                <img src={check} alt="" />
                Access a network of skilled professionals ready to contribute to your projects and help you scale effortlessly.
              </div>
              <div className="title">
                <img src={check} alt="" />
                Empower your team with custom solutions that streamline workflows, enhance productivity, and deliver impactful results.
              </div>
              <div className="title">
                <img src={check} alt="" />
                Collaborate with experts in various fields to bring innovative ideas to life and push your business forward.
              </div>

              <button>Explore JoeGigs Business Solutions</button>

          </div>
        </div>
        <div className="rightItem">
        <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />
        </div>
      </div>
    </div>
  );
};

export default Explore;
