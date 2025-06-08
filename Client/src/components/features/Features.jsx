import React from "react";
import "./Features.scss";
import check from "../../assets/check.png";
import videoFile from "../../assets/video.mp4";

const Features = () => {
  return (
    <div className="features">
      <div className="container">
        <div className="leftItem">
        <div className="leftItem">
  <h1>Unlock a World of Freelance Talent at Your Fingertips</h1>

  <div className="title">
    <img src={check} alt="" />
    Hire with confidence. Work with the best. Succeed effortlessly.
  </div>
  <p>Find skilled professionals globally, from developers to marketers, to bring your ideas to life.</p>

  <div className="title">
    <img src={check} alt="" />
    Work with experts. Achieve excellence. Elevate your business.
  </div>
  <p>Access top freelancers across various fields and scale your success effortlessly.</p>

 
  <p>Connect with passionate professionals in coding, branding, and content creation.</p>

  <div className="title">
    <img src={check} alt="" />
    The talent you need, the flexibility you want, the results you deserve.
  </div>
  <p>Work with skilled experts on short or long-term projects that drive your business forward.</p>
</div>

        </div>
        <div className="rightItem">
          <video width="720" autoPlay muted loop src={videoFile} controls></video>
        </div>
      </div>
    </div>
  );
};

export default Features;
