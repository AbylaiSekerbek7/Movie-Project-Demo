import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Movie.css";
const Movie = () => {
  const [movies, setMovies] = useState({
    items: [],
    isLoading: true,
    search: 'all',
    year: '',
  });
  const [page, setPage] = useState(1);
  const showMore = () => {
    setPage(page + 1);
  };

  // const onChangeSearchValue = (event) => {
  //   setMovies((prev) => ({
  //     ...prev,
  //     isLoading: false,
  //     items: [],
  //     search: event.target.value,
  //   }));
  //   setPage(1);
  // };

  const onChangeSearchValue = (event) => {
    setMovies((prev) => ({
      ...prev,
      isLoading: false,
      items: [],
      search: event.target.value,
      year: ""
    }));
    setPage(1);
  }

  const onSelectedYear = (event) => {
    setMovies((prev) => ({
      ...prev,
      isLoading: false,
      items: [],
      search: prev.search,
      year: event.target.value,
    }));
    setPage(1);
    console.log(movies.year);
  }

  const years = Array.from({length: 50}, (_, index) => new Date().getFullYear() - index);
  console.log(years);

  useEffect(() => {
    axios
      .get(
        `https://www.omdbapi.com/?s=${movies.search}&apikey=bc829a76&type=movie&page=${page}`
      )
      .then((res) => {
        if (page == 1) {
          setMovies((prev) => ({
            isLoading: false,
            items: res.data.Search,
            search: prev.search,
          }));
        } else {
          setMovies((prev) => ({
            isLoading: false,
            items: [...prev.items, ...res.data.Search],
            search: prev.search
          }));
        }
      });
  }, [page, movies.search]);
  return (
    <div className="movie">
      <div className="movie-container">
        <h3 className="movie-title">Все фильмы</h3>
        <input type="text" placeholder="Search..." onChange={onChangeSearchValue}/>
        <label>Year</label>
        <select value={movies.year} onSelect={onSelectedYear}>
          <option value="">All Years</option>
          {years.map((y) => (
            <option value={y} key={y}>{y}</option>
          ))}
        </select>
        <div className="movie__items">
          {movies.isLoading ?  (
            []
            ) : movies?.items !== undefined || movies?.items?.length > 0 ? ( 
              movies?.items?.map((movie) => (
                <div className="movie__items__item" >
                  <img src={movie.Poster} alt="" />
                  <h3>{movie.Title}</h3>
                </div>
              ))
            ) : (
              <p>No Data</p>
            )}
        </div>
        <button onClick={() => showMore()}>Показать еще</button>
      </div>
    </div>
  );
};

export default Movie;