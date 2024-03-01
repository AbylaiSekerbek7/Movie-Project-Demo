import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Movie.css";
import { Link } from "react-router-dom";

const Movie = () => {
  const [movies, setMovies] = useState({
    items: [],
    isLoading: true,
    search: 'all',
    year: '',
  });
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(1);
  const showMore = () => {
    setPage(page + 1);
  };

  const onChangeSearchValue = (event) => {
    setMovies((prev) => ({
      ...prev,
      isLoading: false,
      items: [],
      search: event.target.value,
      year: prev.year,
    }));
    setPage(1);
  }

  const onChangeYearValue = (event) => {
    setMovies((prev) => ({
      ...prev,
      isLoading: false,
      items: [],
      search: prev.search,
      year: event.target.value,
    }));
    setPage(1);
  }

  const movieSort = () => {
    if (sortOrder == "") {
      return movies.items;
    }
    else if (sortOrder == "asc") {
      return movies.items.sort((a, b) => a.Title.localeCompare(b.Title));
    } 
    else if (sortOrder == "desc") {
      return movies.items.sort((a, b) => b.Title.localeCompare(a.Title));
    }
  }

  const movieToDisplay = sortOrder == "" ? movies.items : movieSort();

  const onToggleSort = () => {
    setSortOrder(sortOrder == "asc" ? 'desc' : 'asc');
  }

  const years = Array.from({length: 50}, (_, index) => new Date().getFullYear() - index);
  console.log(years);

  useEffect(() => {
    axios
      .get(
        `https://www.omdbapi.com/?s=${movies.search}&apikey=bc829a76&type=movie&page=${page}&y=${movies.year}`
      )
      .then((res) => {
        if (page == 1) {
          setMovies((prev) => ({
            isLoading: false,
            items: res.data.Search,
            search: prev.search,
            year: prev.year,
          }));
        } else {
          setMovies((prev) => ({
            isLoading: false,
            items: [...prev.items, ...res.data.Search],
            search: prev.search,
            year: prev.year
          }));
        }
      });
  }, [page, movies.search, movies.year]);
  return (
    <div className="movie">
      <div className="movie-container">
        <h3 className="movie-title">Все фильмы</h3>
        <input type="text" placeholder="Search..." onChange={onChangeSearchValue}/>
        <label>Year</label>
        <select value={movies.year} onChange={onChangeYearValue}>
          <option value="">All Years</option>
          {years.map((y) => (
            <option value={y} key={y}>{y}</option>
          ))}
        </select>
        <button onClick={onToggleSort}>Sort by {sortOrder == "asc" ? "desc" : "asc"}</button>
        <div className="movie__items">
          {movies.isLoading ?  (
            []
            ) : movieToDisplay !== undefined || movieToDisplay?.length > 0 ? ( 
              movieToDisplay?.map((movie) => (
                <div className="movie__items__item" >
                  <Link to={`/movies/${movie.imdbID}`}>
                    <img src={movie.Poster} alt="" />
                    <h3>{movie.Title}</h3>
                  </Link>
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