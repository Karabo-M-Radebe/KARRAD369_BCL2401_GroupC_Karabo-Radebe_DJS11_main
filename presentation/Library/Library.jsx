import { useEffect, useState } from "react";
import { fetchPodcasts } from "../../src/assets/services/api";
import { Link, useSearchParams } from "react-router-dom";
import { genreCategory } from "../../src/assets/services/genres";
import "./Library.css";

export const Library = () => {
  const [allShows, setAllShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPodcasts();
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by default
        setAllShows(sortedData);
        setFilteredShows(sortedData); // Initialize filtered shows with sorted data
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const genreFilter = searchParams.get("genre");
    const searchQuery = searchParams.get("search");
    let shows = allShows;

    if (genreFilter) {
      shows = shows.filter(podcast => podcast.genre === genreFilter);
    }

    if (searchQuery) {
      shows = shows.filter(podcast =>
        podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        genreCategory[podcast.genre].toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredShows(shows);
  }, [searchParams, allShows]);

  const sortData = (value) => {
    let sortedPodcasts = [...filteredShows]; // Create a copy of the podcast array

    if (value === "Newest") {
      sortedPodcasts.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (value === "Oldest") {
      sortedPodcasts.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    } else if (value === "A-Z") {
      sortedPodcasts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === "Z-A") {
      sortedPodcasts.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredShows(sortedPodcasts);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!allShows.length) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="dropdown-container">
        <div className="genre-dropdown">
          <select onChange={(e) => setSearchParams({ genre: e.target.value })}>
            <option value="">Select Genre</option>
            {Object.keys(genreCategory).map((key) => (
              <option key={key} value={key}>
                {genreCategory[key]}
              </option>
            ))}
          </select>
        </div>

        <div className="sort-dropdown">
          <select onChange={(e) => sortData(e.target.value)}>
            <option value="">Sort By</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="card-container">
        {filteredShows.map((show) => (
          <div key={show.id} className="podcast-card">
            <Link to={`/${show.id}`}><img src={show.image} alt={show.title} /></Link>
            <div className="podcast-info">
              <h3>{show.title}</h3>
              <p>Seasons: {show.seasons}</p>
              <p>Last updated: {new Date(show.updated).toLocaleString()}</p>
              <p>Genre: {show.genres.map((genre) => genreCategory[genre]).join(', ')}</p> {/* Displaying genre */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
