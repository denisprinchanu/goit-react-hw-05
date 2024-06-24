import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
const key = "82e2769bce5dd0ce4e5c9f5b36e35b60";
const autorizationKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmUyNzY5YmNlNWRkMGNlNGU1YzlmNWIzNmUzNWI2MCIsInN1YiI6IjY2NmExMWMyMjI0ZTEzNDkwZmE2ZTRkZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FE2 - XOJaQ64id5kmKTGfd7h_HrW6OqfSmRSL27jm53U";
export const fetchTrendingMovies = async () => {
  const response = await axios.get("/trending/movie/week", {
    params: { api_key: key },
    headers: {
      Authorization: `Bearer ${autorizationKey}`,
    },
  });

  return response.data;
};

export const fetchMoviesWithTopic = async (topic) => {
  const response = await axios.get("/search/movie", {
    params: { api_key: key, query: topic },
    headers: {
      Authorization: `Bearer ${autorizationKey}`,
    },
  });

  return response.data;
};
export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, {
    params: { api_key: key },
    headers: {
      Authorization: `Bearer ${autorizationKey}`,
    },
  });
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    params: { api_key: key },
    headers: {
      Authorization: `Bearer ${autorizationKey}`,
    },
  });
  return response.data;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    params: { api_key: key },
    headers: {
      Authorization: `Bearer ${autorizationKey}`,
    },
  });
  return response.data;
};
