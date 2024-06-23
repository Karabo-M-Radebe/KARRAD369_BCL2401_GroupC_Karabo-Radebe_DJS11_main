import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchShow } from "../../src/assets/services/api";
import { BsBookmarks, BsBookmarksFill } from "react-icons/bs";
import './CardPreview.css';

export const CardPreview = () => {
  const [allShows, setAllShows] = useState(null);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchShow(id);
        setAllShows(data);
        setSelectedSeason(data.seasons[0].season); // Set the first season as default
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
  };

  const isLiked = (episode) => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    return favourites.some(
      (like) =>
        like.episode === episode.episode &&
        like.season === episode.season &&
        like.allShowsId === id
    );
  };

  const toggleLike = (episode) => {
    const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    const episodeData = {
      allShowsId: id,
      season: episode.season,
      episode: episode.episode,
      title: episode.title,
      description: episode.description,
      file: episode.file,
      image: episode.image, // Correctly set the image property
    };

    if (isLiked(episode)) {
      const newFavourites = favourites.filter(
        (like) =>
          like.episode !== episode.episode ||
          (like.season !== episode.season && like.allShowsId !== id)
      );
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
    } else {
      favourites.push(episodeData);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }

    setAllShows((prevShow) => ({
      ...prevShow,
      seasons: prevShow.seasons.map((season) => ({
        ...season,
        episodes: season.episodes.map((ep) =>
          ep.episode === episode.episode
            ? { ...ep, liked: !isLiked(episode) }
            : ep
        ),
      })),
    }));
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!allShows) {
    return <div>Loading...</div>;
  }

  const filteredEpisodes = selectedSeason
    ? allShows.seasons.find((season) => season.season === selectedSeason)?.episodes || []
    : allShows.seasons.flatMap((season) => season.episodes);

  return (
    <>
      <div className="show-detail-container">
        <h1 className="show-detail-container">{allShows.title}</h1>
        <p className="show-detail-description">{allShows.description}</p>

        <div className="season-dropdown">
          <label htmlFor="season-select">Select Season:</label>
          <select
            id="season-select"
            onChange={(e) => handleSeasonSelect(parseInt(e.target.value))}
            value={selectedSeason}
          >
            {allShows.seasons.map((season) => (
              <option key={season.season} value={season.season}>
                {season.title}
              </option>
            ))}
          </select>
        </div>

        {filteredEpisodes.map((episode) => (
          <div key={episode.episode} className="episode-container">
            <div className="show-card">
              <div className="show-information">
                <h3>{episode.title}</h3>
                <img src={episode.image} alt={episode.title} className="episode-image" />
                <p>{episode.description}</p>
                <audio controls src={episode.file}>
                  Your browser does not support the audio element.
                </audio>
                {isLiked(episode) ? (
                  <BsBookmarksFill
                    onClick={() => toggleLike(episode)}
                    className="like-icon"
                  />
                ) : (
                  <BsBookmarks
                    onClick={() => toggleLike(episode)}
                    className="like-icon"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
