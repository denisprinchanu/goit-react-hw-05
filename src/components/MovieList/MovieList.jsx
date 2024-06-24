import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li key={id}>
          <Link to={`/movies/${id}`} state={location} className={css.movie}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
