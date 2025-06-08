import React, { useEffect, useState } from 'react';
import "./Navbar.scss";
import avatar from "../../assets/noavatar.jpg";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

const App = () => {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation(false);

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    }

    useEffect(() => {
        window.addEventListener("scroll", isActive);
        return () => {
            window.removeEventListener("scroll", isActive);
        }
    }, []);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await newRequest.post("/auth/logout");
            localStorage.setItem("currentUser", null);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = async () => {
        navigate("/register");
    };

    const handleOutsideClick = (e) => {
        if (!e.target.closest(".links, .hamburger")) {
            setMenuOpen(false);
            setOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    return (
        <div className={`navbar ${pathname === "/" ? "home-page" : ""} ${active || pathname !== "/" ? "active" : ""}`}>
            <div className="container">
                <div className="logo">
                    <Link to="/" className='link'>
                        <span className="text">JoeGigs</span>
                    </Link>
                    <span className="dot">.</span>
                </div>

                {/* HAMBURGER BUTTON */}
                <button 
                    className={`hamburger ${pathname !== "/" ? "black-icon" : ""}`} 
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✖" : "☰"}
                </button>

                {/* NAV LINKS - ONLY SHOW WHEN menuOpen IS TRUE */}
                <div className={`links ${menuOpen ? "show" : ""}`}>
                    <span>Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    <span><Link to="/login" className='link'>Sign In</Link></span>

                    {!currentUser?.isSeller && <span>Become a Seller</span>}
                    {!currentUser && <button onClick={handleClick}>Join</button>}

                    {currentUser && (
                        <div className="user" onClick={() => setOpen(!open)}>
                            <img src={currentUser.img || avatar} alt="" />
                            <span>{currentUser?.username}</span>
                            {open && (
                                <div className="options">
                                    {currentUser?.isSeller && (
                                        <>
                                            <Link className='link' to="/myGigs">Gigs</Link>
                                            <Link className='link' to="/add">Add New Gig</Link>
                                        </>
                                    )}
                                    <Link className='link' to="/orders">Orders</Link>
                                    <Link className='link' to="/messages">Messages</Link>
                                    <Link className='link' onClick={handleLogout}>Logout</Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {(active || pathname !== "/") && (
                <>
                    <hr />
                    <div className="menu">
                        <Link className='link'>Graphics & Design</Link>
                        <Link className='link'>Video & Animation</Link>
                        <Link className='link'>Writing & Translation</Link>
                        <Link className='link'>AI Service</Link>
                        <Link className='link'>Digital Marketing</Link>
                        <Link className='link'>Music & Audio</Link>
                        <Link className='link'>Programming & Tech</Link>
                        <Link className='link'>Business</Link>
                        <Link className='link'>Lifestyle</Link>
                    </div>
                    <hr />
                </>
            )}
        </div>
    );
}

export default App;
