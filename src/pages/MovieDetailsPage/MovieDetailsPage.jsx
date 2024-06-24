import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../../components/movies-api";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import Loader from "../../components/Loader/Loader";

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const defaultImg = "https://via.placeholder.com/200x300";
  const location = useLocation();
  const backLinkHref = location.state ?? "/movies";
  console.log("location.state :>> ", location.state);
  useEffect(() => {
    async function getMovieDetails() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getMovieDetails();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error fetching movie details: {error.message}</div>;
  }

  if (!movie) {
    return <div>Not found</div>;
  }
  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  return (
    <>
      <Link to={backLinkHref} className={css.backLink}>
        Back
      </Link>
      <div className={css.wrapper}>
        <img
          src={
            movie["poster_path"]
              ? `https://image.tmdb.org/t/p/w500/${movie["poster_path"]}`
              : defaultImg
          }
          alt={movie.title}
          width={200}
        />
        <div>
          <h1>
            {movie.title} ({releaseYear})
          </h1>
          <p>User score: {movie.vote_average}/10</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <p>
            {movie.genres.map((genre) => {
              return `${genre.name} `;
            })}
          </p>
        </div>
      </div>
      <h2>Additional information</h2>

      <ul className={css.add}>
        <li>
          <NavLink to="cast" className={buildLinkClass} state={location.state}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink
            to="reviews"
            className={buildLinkClass}
            state={location.state}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
