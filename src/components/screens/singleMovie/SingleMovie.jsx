import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './SingleMovie.css';

const SingleMovie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
      item: {},
      isLoading: true,
  })
  const [comments, setComments] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() =>  {
    axios
        .get(`http://www.omdbapi.com/?i=${id}&apikey=bc829a76`)
        .then((res) => setMovie({
            isLoading: false,
            item: res.data,
        }));
    axios.get("http://localhost:3001/comments").then((res) => { setComments(res.data); });
    axios.get("http://localhost:3001/favorites").then((res) => { setFavorites(res.data); });
  }, []);

  // Work with Favorite
  const onFavorite = async (movie) => {
    if (favorites.find((favorite) => favorite.id == movie?.imdbID)) {
        return await axios.delete(`http://localhost:3001/favorites/${movie.imdbID}`).then(() => {
            const updatedFavorite = favorites.filter((favorite) => favorite.id !== movie.imdbID);    
            setFavorites(updatedFavorite);
        })  
    } 
    else {
        return await axios.post("http://localhost:3001/favorites", {
            id: movie.imdbID
        }).then((res) => {
            setFavorites([...favorites, res.data]);
        })
    }
  }
  
  const isFavorite = (id) => favorites.find((favorite) => favorite.id == id) ? true : false;

  return (
      <>
        <div className="single-movie">
            <div className="single-movie_container">
                <h3 className="single-movie_title">Один Фильм</h3>
                <Link to={"/movies"} className="single-movie_title">  Back to Movies</Link>
                <div className="single-movie_card">
                    <img className="single-movie_card_poster" src={movie.item.Poster} alt="movie poster" />
                    <p className="single-movie_card_info">Information: </p>
                    <p className="single-movie_card_title">{movie.item.Title}</p>
                    <p className="single-movie_card_plot">{movie.item.Plot} {movie.item.Runtime}</p>
                    <br />
                    <p className="single-movie_card_plot">{movie.item.Released}, {movie.item.Country}, {movie.item.Writer}</p>
                    <br />
                    <p className="single-movie_card_plot">Rating: {movie.item.imdbRating}</p>
                </div>
                <button onClick={() => onFavorite(movie.item)} style={{background: isFavorite(movie.item.imdbID) ? "blue" : "red"}}>Add to Favorite</button>

            </div>
        </div>
      </>
  );
};

export default SingleMovie;

// Actors
// : 
// "Michelle Yeoh, Stephanie Hsu, Jamie Lee Curtis"
// Awards
// : 
// "Won 7 Oscars. 402 wins & 373 nominations total"
// BoxOffice
// : 
// "$77,191,785"
// Country
// : 
// "United States"
// DVD
// : 
// "07 Jun 2022"
// Director
// : 
// "Daniel Kwan, Daniel Scheinert"
// Genre
// : 
// "Action, Adventure, Comedy"
// Language
// : 
// "English, Mandarin, Cantonese"
// Metascore
// : 
// "81"
// Plot
// : 
// "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led."
// Poster
// : 
// "https://m.media-amazon.com/images/M/MV5BYTdiOTIyZTQtNmQ1OS00NjZlLWIyMTgtYzk5Y2M3ZDVmMDk1XkEyXkFqcGdeQXVyMTAzMDg4NzU0._V1_SX300.jpg"
// Production
// : 
// "N/A"
// Rated
// : 
// "R"
// Ratings
// : 
// (3) [{…}, {…}, {…}]
// Released
// : 
// "08 Apr 2022"
// Response
// : 
// "True"
// Runtime
// : 
// "139 min"
// Title
// : 
// "Everything Everywhere All at Once"
// Type
// : 
// "movie"
// Website
// : 
// "N/A"
// Writer
// : 
// "Daniel Kwan, Daniel Scheinert"
// Year
// : 
// "2022"
// imdbID
// : 
// "tt6710474"
// imdbRating
// : 
// "7.8"
// imdbVotes
// : 
// "519,100"