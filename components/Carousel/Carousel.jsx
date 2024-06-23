import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Carousel.css";
import { useState, useEffect } from "react";
import { fetchPodcasts } from "../../src/assets/services/api";

export const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allShows, setAllShows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPodcasts();
        setAllShows(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = Math.floor(Math.random() * allShows.length);
        return newIndex !== prevIndex ? newIndex : (newIndex + 1) % allShows.length;
      });
    }, 3000); // Shuffle every 3 seconds

    return () => clearInterval(shuffleInterval);
  }, [allShows]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allShows.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === allShows.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (allShows.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={goToPrevious}>
        ‹
      </button>
      <div className="carousel-content">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {allShows.map((show, index) => (
            <div key={index} className="carousel-item">
              <Link to={`/${show.id}`}>
                 <h1 className="carousel-title">{show.title}</h1>
                 <img src={show.image} alt={show.title} />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-button next" onClick={goToNext}>
        ›
      </button>
    </div>
  );
};
