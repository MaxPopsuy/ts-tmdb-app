import {
  MoviesInterface,
  Query,
  Urls,
  Element,
  TypeRequest,
} from './interfaces/interfaces';
import { getMovies, setError } from './api/api';
import { save, get } from './api/localStorage';
import {
  renderSectionFavoriteMovies,
  renderPreview,
  renderMovies,
  renderError,
} from './render';

import { Buttons } from './interfaces/interfaces';

const cardsContainer: Element = document.querySelector('#film-container');
const formInput: Element = document.querySelector('#search');
const loadMoreBtn: Element = document.querySelector('#load-more');
const randomMovieSection: Element = document.querySelector('#random-movie');
const bg_container: Element = document.querySelector('#random-movie');
let searchForm: string;
let favoriteMovies: number[] = [];
let likeButtons: Node[];

const createSectionMovies = (
  container: Element,
  arrayMovies: MoviesInterface
): void => {
  if (get('arrayId')) {
    favoriteMovies = [...get('arrayId')];
  }
  renderSectionFavoriteMovies(favoriteMovies);
  renderMovies(container, arrayMovies, favoriteMovies);
  likeButtons = [...document.querySelectorAll('.bi-heart-fill')];
  likeButtons.map((element): void =>
    element?.addEventListener('click', handleOnClickLike)
  );
};

const handleOnClickLike = (event: Event): void => {
  (event.currentTarget as HTMLElement).classList.toggle('colorRed');
  const movieId = (event.currentTarget as HTMLElement).dataset.movieid;
  if ((event.currentTarget as HTMLElement).classList.contains('colorRed')) {
    favoriteMovies.push(movieId as unknown as number);
    console.log(favoriteMovies);
    save('arrayId', favoriteMovies);
  } else {
    favoriteMovies = favoriteMovies.filter((item: number) => {
      console.log(+item);
      return +item !== (movieId ? +movieId : null);
    });
    // favoriteMovies = favoriteMovies.map((movieId) => Number(movieId));
    console.log(favoriteMovies);
    save('arrayId', favoriteMovies);
  }
  renderSectionFavoriteMovies(favoriteMovies);
};

const createPage = async (
  url: Urls,
  query: Query,
  typeRender: TypeRequest
): Promise<void> => {
  let Movies: MoviesInterface;
  try {
    switch (typeRender) {
      case TypeRequest.getMovies:
        Movies = (await getMovies(
          url,
          query,
          TypeRequest.getMovies
        )) as MoviesInterface;
        if ((Movies as MoviesInterface)?.results.length === 0) {
          setError('Oops, Not found 404 :(');
        }
        cardsContainer ? (cardsContainer.innerHTML = '') : null;
        return createSectionMovies(cardsContainer, Movies);
      case TypeRequest.pagination:
        Movies = (await getMovies(
          url,
          query,
          TypeRequest.pagination
        )) as MoviesInterface;
        return createSectionMovies(cardsContainer, Movies);
    }
  } catch (error: any) {
    console.log(error);
    renderError(cardsContainer, error.message);
  }
};

const setTypeLoadMoreBtn = (typeBtn: Buttons | null, query: Query) => {
  switch (typeBtn) {
    case Buttons.popularBtn:
      return createPage(Urls.popular, null, TypeRequest.pagination);
    case Buttons.upComingBtn:
      return createPage(Urls.upComing, null, TypeRequest.pagination);
    case Buttons.topRatedBtn:
      return createPage(Urls.topRated, null, TypeRequest.pagination);
    case Buttons.submitBtn:
      return createPage(Urls.byName, query, TypeRequest.pagination);
  }
};
let handlerOnclickLoadMoreBtn = setTypeLoadMoreBtn.bind(
  this,
  Buttons.popularBtn,
  null
);

const handlerOnClick = (
  url: Urls,
  typeReq: TypeRequest,
  typeButton: Buttons,
  query: Query
): void => {
  loadMoreBtn?.removeEventListener('click', handlerOnclickLoadMoreBtn);
  handlerOnclickLoadMoreBtn = setTypeLoadMoreBtn.bind(this, typeButton, query);
  loadMoreBtn?.addEventListener('click', handlerOnclickLoadMoreBtn);
  !query ? ((formInput as HTMLInputElement).value = '') : formInput;
  createPage(url, query, typeReq);
};

const onClickButtons = async (typeButtons: Buttons): Promise<void> => {
  switch (typeButtons) {
    case Buttons.topRatedBtn:
      document
        .querySelector('#top_rated')
        ?.addEventListener('click', (): void =>
          handlerOnClick(
            Urls.topRated,
            TypeRequest.getMovies,
            Buttons.topRatedBtn,
            null
          )
        );
      break;
    case Buttons.popularBtn:
      document
        .querySelector('#popular')
        ?.addEventListener('click', (): void =>
          handlerOnClick(
            Urls.popular,
            TypeRequest.getMovies,
            Buttons.popularBtn,
            null
          )
        );
      break;
    case Buttons.upComingBtn:
      document
        .querySelector('#upcoming')
        ?.addEventListener('click', (): void =>
          handlerOnClick(
            Urls.upComing,
            TypeRequest.getMovies,
            Buttons.upComingBtn,
            null
          )
        );
      break;
    case Buttons.submitBtn:
      formInput?.addEventListener('input', (event): string => {
        searchForm = (event.target as HTMLInputElement).value;
        return searchForm;
      });
      document
        .querySelector('#submit')
        ?.addEventListener('click', (): void =>
          handlerOnClick(
            Urls.byName,
            TypeRequest.getMovies,
            Buttons.submitBtn,
            searchForm
          )
        );
      break;
  }
};

const createDefaultPage = async (): Promise<void> => {
  console.log(get('arrayId'));
  // if (get('arrayId')) {
  //   favoriteMovies = [...get('arrayId')];
  // }
  try {
    const movies = (await getMovies(
      Urls.popular,
      null,
      TypeRequest.getMovies
    )) as MoviesInterface;
    console.log(movies);
    renderPreview(randomMovieSection, bg_container, movies);
    createPage(Urls.popular, null, TypeRequest.getMovies);
    loadMoreBtn?.addEventListener('click', handlerOnclickLoadMoreBtn);
  } catch (error: any) {
    console.log(error);
    renderError(cardsContainer, error.message);
  }
};

export async function render(): Promise<void> {
  // TODO render your app here
  createDefaultPage();
  // renderSectionFavoriteMovies(get('arrayId'));
  onClickButtons(Buttons.popularBtn);
  onClickButtons(Buttons.topRatedBtn);
  onClickButtons(Buttons.upComingBtn);
  onClickButtons(Buttons.submitBtn);
}
