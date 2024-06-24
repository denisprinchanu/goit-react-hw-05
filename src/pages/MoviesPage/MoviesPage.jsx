import MovieList from "../../components/MovieList/MovieList";
import { toast } from "react-hot-toast";
import { fetchMoviesWithTopic } from "../../components/movies-api";
import { useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [params, setSearchParams] = useSearchParams();
  const topic = params.get("query") ?? "";

  useEffect(() => {
    if (topic === "") {
      return;
    }
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMoviesWithTopic(topic);
        if (data.results.length === 0) {
          setSearchResults(null);
        } else {
          setSearchResults(data.results);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [topic]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const newTopic = form.elements.topic.value.trim();
    if (!newTopic) {
      toast.error("You must write something", {
        position: "top-right",
        duration: 1000,
      });
      return;
    }
    setSearchParams({ query: newTopic });
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="topic"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      {searchResults ? (
        <MovieList movies={searchResults} />
      ) : (
        <div>Not Found</div>
      )}
      {error && <ErrorMessage />}
      {loading && <Loader />}
    </div>
  );
};

export default MoviesPage;
