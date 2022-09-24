// import { Movie,  MoviesInterface, ResultInterface } from './movie';
import { Urls } from './urls';
// import { Buttons } from './buttons';
interface Movie {
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  id: number;
}
enum Buttons {
  topRatedBtn,
  popularBtn,
  upComingBtn,
  submitBtn,
}
interface MoviesInterface {
  page: number;
  results: Movie[];
}

interface ResultInterface {
  page: number;
  results: Movie[];
}
enum TypeRequest {
  pagination,
  getMovies,
}

type Element = HTMLElement | null;

type Query = string | null;

export {
  Movie,
  MoviesInterface,
  ResultInterface,
  Buttons,
  Element,
  Query,
  Urls,
  TypeRequest,
};
