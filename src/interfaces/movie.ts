interface Movie {
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  id: number;
}

interface  MoviesInterface {
  page: number;
  results: Movie[];
}

interface  ResultInterface {
  page: number;
  results: Movie[];
}

export { Movie,  MoviesInterface, ResultInterface };
