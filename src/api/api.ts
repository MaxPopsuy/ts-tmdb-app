import { Movie, Movies } from '../interfaces/interfaces';
import { Query } from '../interfaces/constants';
// require('dotenv').config();
let movies: Movies | Movie;
let page: number = 1;

const movieParserMovies = (result: Movies): Movies => {
  movies = {
    page: result.page,
    results: result.results.map((item: Movie) => ({
      original_title: item.original_title,
      overview: item.overview,
      poster_path: item.poster_path,
      release_date: item.release_date,
      backdrop_path: item.backdrop_path,
      id: item.id,
    })),
  };

  return movies;
};
const movieParserMovie = (result: Movie): Movie => {
  movies = {
    original_title: result.original_title,
    overview: result.overview,
    poster_path: result.poster_path,
    release_date: result.release_date,
    backdrop_path: result.backdrop_path,
    id: result.id,
  };
  return movies;
};

const setError = (errorMessage: string): never => {
  throw Error(errorMessage);
};

const getMovies = async <T>(url: string, query?: Query): Promise<T> => {
  const formattedQuery = query?.split(' ').join('+');
  console.log(formattedQuery);
  const endpointUrl: string =
    process.env.BASE_URL +
    url +
    `?api_key=${process.env.API_KEY}${formattedQuery ? `&query=${formattedQuery}` : ''}`;
  let movies = await fetch(endpointUrl)
    .then((response) =>
      response.ok ? response.json() : Promise.reject(Error('Failed to load'))
    )
    .catch((error) => {
      throw error;
    });
  if (movies.results) {
    movies = movieParserMovies(movies);
    return movies;
  }
  movies = movieParserMovie(movies);
  return movies;
};

export { getMovies, setError };
