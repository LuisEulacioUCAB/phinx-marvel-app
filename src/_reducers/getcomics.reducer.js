import { marvelConstants } from '../shared/marvel.constants';

/**
 * State for get comic.
 *
 * @param {object}state - State.
 * @param {object}action - Actions.
 * @returns {{}} Object.
 */
export function getcomics(state = {}, action) {
  switch (action.type) {
  case marvelConstants.GET_COMICS_REQUEST:
    return {};
  case marvelConstants.GET_COMICS_SUCCESS:
    return { comicsList: action.comicsList };
  case marvelConstants.GET_COMICS_FAILURE:
    return {
      error: action.error,
    };
  default:
    return state;
  }
}
