import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../movies-api";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const defaultImg = "https://via.placeholder.com/200x300";

  useEffect(() => {
    async function getMovieCast() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieCast(movieId);
        setCast(data.cast.slice(0, 10));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getMovieCast();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching movie details: {error.message}</div>;
  }

  if (cast.length === 0) {
    return <div>Not found</div>;
  }
  return (
    <ul className={css.add}>
      {cast.map((actor) => {
        return (
          <li key={actor.id} className={css.character}>
            <h4 className={css.title}>
              {actor.name} - {actor.character}
            </h4>
            <img
              src={
                actor["profile_path"]
                  ? `https://image.tmdb.org/t/p/w200/${actor["profile_path"]}`
                  : defaultImg
              }
              alt={actor.character}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default MovieCast;
