import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/screens/home/Home";
import Movie from "./components/screens/movie/Movie";
// https://www.omdbapi.com/?s=all&page=1&apikey=bc829a76&type=movie
const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movie />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
