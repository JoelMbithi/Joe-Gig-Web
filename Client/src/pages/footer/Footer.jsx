import React from "react";
import "./Footer.scss";
import twitter from "../../assets/twitter.png";
import instagram from "../../assets/instagram.png";
import linked from "../../assets/linkedin.png";
import pinterest from "../../assets/pinterest.png";
import facebook from "../../assets/facebook.png";
import language from "../../assets/language.png";
import coin from "../../assets/coin.png";
import accessibility from "../../assets/accessibility.png";


const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          
        <div className="item">
            <h2>Education & Learning</h2>
            <span>Online Courses</span>
            <span>Language Learning</span>
            <span>Public Speaking</span>
            <span>Personal Development</span>
            <span>Science & Engineering</span>
            <span>Test Preparation</span>
            <span>Mathematics & Statistics</span>
            <span>History & Culture</span>
          </div>
          
          <div className="item">
            <h2>Development</h2>
            <span>Web Development</span>
            <span>Mobile App Development</span>
            <span>Game Development</span>
            <span>Software Engineering</span>
            <span>Database Management</span>
            <span>Cloud Computing</span>
            <span>DevOps & CI/CD</span>
            <span>Cybersecurity</span>
          </div>
          <div className="item">
            <h2>Creative & Design</h2>
            <span>UI/UX Design</span>
            <span>Graphic Design</span>
            <span>Illustration</span>
            <span>Branding & Identity</span>
            <span>Interior Design</span>
            <span>Fashion & Style</span>
            <span>Photography & Editing</span>
            <span>3D Modeling & Animation</span>
          </div>
          <div className="item">
            <h2>Business & Finance</h2>
            <span>Entrepreneurship</span>
            <span>Finance & Accounting</span>
            <span>Investment & Trading</span>
            <span>Marketing Strategies</span>
            <span>Human Resources</span>
            <span>Sales & Lead Generation</span>
            <span>Business Consulting</span>
            <span>Project Management</span>
          
         </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>JoeGigs</h2>
            <span>&copy;JoeGigs 2025 </span>
            <span>joellembithi@gmail.com</span>
          </div>
          <div className="right">
            <div className="social">
              <img src={twitter} alt="" />
              <img src={instagram} alt="" />
              <img src={pinterest} alt="" />
              <img src={linked} alt="" />
              <img src={facebook} alt="" />
            </div>
            <div className="linkF">
            <div className="link">
              <img src={language} alt="" />
              <span>English</span>
              
            </div>
          
        <div className="link">
          <img src={coin} alt="" />
          <span>USD</span>
        </div>
        <div className="link">
          <img src={accessibility} alt="" />
          <span>Accessibility</span>
          </div>
            </div>
          </div>
        </div>
      </div>
      </div>
 
  );
};

export default Footer;
