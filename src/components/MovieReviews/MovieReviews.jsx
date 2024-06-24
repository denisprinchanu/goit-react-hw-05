import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../movies-api";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovieReviews() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovieReviews(movieId);
        if (data.results.length === 0) {
          setReviews(null);
        } else {
          setReviews(data.results.slice(0, 10));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    getMovieReviews();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching movie details: {error.message}</div>;
  }

  if (!reviews) {
    return <div>Not found</div>;
  }
  return (
    <ul className={css.reviewsWrapper}>
      {reviews.map((review) => {
        return (
          <li key={review.id} className={css.review}>
            <h4>Author - {review.author}</h4>
            <p className={css.text}>{review.content}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieReviews;
