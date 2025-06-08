import React from 'react'
import "./Home.scss"
import Featured from '../../components/featured/Featured'
import TrustedBy from '../../components/trustedB y/TrustedBy'
import Slide from '../../components/slide/Slide'
import Features from '../../components/features/Features'
import Explore from '../../components/explore/Explore'
import { projects, cards } from "../../data.js"; // Import project & category data


const Home = () => {
  return (
    <div>
      <Featured />
      <TrustedBy />
      
    

      {/* Slide for Categories */}
   
      <Slide items={cards} type="categories" />

      <Features />
       {/* Slide for Projects */}
      <Slide items={projects} type="projects" />
      <Explore />
    </div>
  )
}

export default Home
