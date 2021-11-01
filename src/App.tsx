import React from "react";
import "./styles.css";
import Login from "./components/Login";
import Movies from "./components/movie";
import addmovie from "./components/addmovie";
import Menubar from "./components/menubar";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function myApp() {
  return (
    <div className="App">
      <h1>StarMovies</h1>
      <h2>The best Movies</h2>
    </div>
  );
}

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const Menunav = () => {
    return (
      <div className="menubar">
        <ul>
          <li>Login</li>
          <li>Home</li>
          <li>Movies</li>
          <li>categories</li>
          <li>Contact Us</li>
        </ul>
      </div>
    );
  };
};

export default myApp;
