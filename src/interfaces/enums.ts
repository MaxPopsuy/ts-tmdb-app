enum Buttons {
  topRatedBtn,
  popularBtn,
  upComingBtn,
  submitBtn,
}
enum TypeRequest {
  pagination,
  getMovies,
}
enum Urls {
  topRated = '/movie/top_rated',
  popular = '/movie/popular',
  upComing = '/movie/upcoming',
  byName = '/search/movie',
}
export {Buttons, TypeRequest, Urls}