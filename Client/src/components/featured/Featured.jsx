import React from 'react'
import "./Featured.scss"
import profileImage from "../../assets/back.jpeg"
import search from "../../assets/search.png"
import {useNavigate} from "react-router-dom"
import { useState } from 'react'


const Featured = () => {
  const [input,setInput] =useState("")
  const navigate = useNavigate()

  const handleSubmit= ()=> {
   navigate(`/gigs?search=${input}`)
  }
  return (
    <div className='featured'>
      <div className="container">
        <div className="left">
            <h1>Find The perfect <i>Freelance </i>service for your business</h1>
            <div className="search">
                <div className="searchInput">
                    <img src={search} alt="" />
                    <input type="text" 
                    placeholder='Try "building mobile app"'
                    onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit}>search</button>
            </div>
            <div className="popular">
                <span>Popular:</span>
                <button>Web Design</button>
                <button>WorkPress</button>
                <button>Logo Design</button>
                <button>AI service</button>
            </div>
        </div>
        <div className="right">
            <img src={profileImage} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Featured
