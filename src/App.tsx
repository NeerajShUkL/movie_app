import React from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Favorite from "./pages/Favorite";

function App() {
  const { category, movieId } = useSelector((state: RootState) => state.movies);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/movie_app/" element={<Home />} />
        <Route path="/movie_app/favorite" element={<Favorite />} />
        <Route path={`/movie_app/${category}`} element={<Home />} />
        <Route path={`/movie_app/${category}/${movieId}`} element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
