import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/screens/home/Home";
import Movie from "./components/screens/movie/Movie";
import SingleMovie from "./components/screens/singleMovie/SingleMovie";
import "./App.css";
import { useTheme } from "./providers/ThemeProvider";

// https://www.omdbapi.com/?s=all&page=1&apikey=bc829a76&type=movie

const App = () => {
  const { theme } = useTheme();
  return (
    <div className={theme == "dark" ? "dark_theme" : "light_theme"}>
      <BrowserRouter>
        <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/movies/:id" element={<SingleMovie />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
