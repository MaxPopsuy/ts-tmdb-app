interface Movie {
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  backdrop_path: string;
  id: number;
}

interface Movies {
  page: number;
  results: Movie[];
}
export { Movie, Movies };
