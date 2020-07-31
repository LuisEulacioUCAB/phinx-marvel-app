import { marvelConstants } from '../shared/marvel.constants';

/**
 * State for get comic.
 *
 * @param {object}state - State.
 * @param {object}action - Actions.
 * @returns {{}} Object.
 */
export function getComics(state = {}, action) {
  switch (action.type) {
  case marvelConstants.GET_COMICS_REQUEST:
    return {
      comicsList: [],
    };
  case marvelConstants.GET_COMICS_SUCCESS:
    return { comicsList: action.comicsList };
  case marvelConstants.GET_COMICS_FAILURE:
    return {
      comicsList: [],
      error: action.error,
      loading:false
    };
  default:
    return state;
  }
}


