import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import css from "./HomePage.module.css";

import { fetchTrendingMovies } from "../../components/movies-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovie() {
      try {
        setLoading(true);
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getMovie();
  }, []);

  return (
    <div>
      <h1 className={css.title}> Trending today</h1>
      {loading && <Loader />}
      <MovieList movies={movies} />
      {error && <ErrorMessage error={error} />}
    </div>
  );
};
export default HomePage;
