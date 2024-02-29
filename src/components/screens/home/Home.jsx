import React, { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [movies, setMovies] = useState({
    items: [],
    isLoading: true,
  });

  useEffect(() => {
    axios
      .get("https://www.omdbapi.com/?s=all&page=1&apikey=bc829a76&type=movie")
      .then((res) => {
        setMovies({
          items: res.data.Search,
          isLoading: false,
        });
      });
  }, []);
  console.log(movies);
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-content">
          <div className="home-content__movie">
            <Link to={"/movies"} className="home-content__movie__title">
              Фильмы
            </Link>
            <div className="home-content__movie__list">
              {movies.isLoading ? (
                <p>Загрузка...</p>
              ) : (
                movies.items.slice(0, 6).map((movie) => (
                  <div className="home-content__movie__list__card">
                    <img src={movie.Poster} alt={movie.Title} />
                    <h3>{movie.Title}</h3>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
