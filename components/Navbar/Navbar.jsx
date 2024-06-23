import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { LuLibrary } from "react-icons/lu";
import { BsHeart } from "react-icons/bs";
import { IoSearchCircleOutline } from "react-icons/io5";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (isSearchActive) {
      navigate(`/library?search=${searchQuery}`);
    } else {
      setIsSearchActive(true);
    }
  };

  return (
    <header className={`navbar ${isSearchActive ? "search-active" : ""}`}>
      <Link to="/"><img src="jelly-beans.png" className="logo-icon" alt="logo"/> BeanPod </Link>
      <nav>
        <NavLink to="/library"> <LuLibrary/> Library </NavLink>
        <NavLink to="/favourites"> <BsHeart/> Favourites </NavLink>
      </nav>
      <div className="search-container">
        {isSearchActive && (
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        )}
        <button onClick={handleSearch}>
          <IoSearchCircleOutline/>
        </button>
      </div>
    </header>
  );
};
