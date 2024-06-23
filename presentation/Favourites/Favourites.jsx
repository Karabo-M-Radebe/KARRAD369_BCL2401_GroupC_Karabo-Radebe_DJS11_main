import { useEffect, useState } from "react";

import { Link } from "react-router-dom";


export const Favourites = () => {

    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavourites = localStorage.getItem('favourites')
        if (storedFavourites) {
            setFavourites(JSON.parse(storedFavourites));
    }
}, []);

return(
    <>
      <h1>Favourite Episodes</h1>
        {favourites.length === 0 ? (
          <p>No favourite episodes yet.</p>
        ) : (
          favourites.map((show) => (
            <Link to={`/podcast/${show.podcastId}`} key={show.episode}>
              <div className="card-container">
                <div className="podcast-card">
                  <img src={show.image} alt={show.title} />
                  <div className="podcast-info">
                    <h3>{show.title}</h3>
                    <h4>{show.episode.title}</h4>
                    <p>{show.episode.description}</p>
                    <p>Episode: {show.episode}</p>
                    <audio controls src={show.episode.file}></audio>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
    </>
)
}