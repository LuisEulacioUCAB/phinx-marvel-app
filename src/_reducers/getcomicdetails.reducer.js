import { marvelConstants } from '../shared/marvel.constants';

/**
 * State for get all characters.
 *
 * @param {object}state - State.
 * @param {object}action - Actions.
 * @returns {{}} Object.
 */
export function getcomicdetails(state = {}, action) {
  switch (action.type) {
  case marvelConstants.GET_COMIC_DETAILS_REQUEST:
    return {
      loading: true,
      comic: [],
    };
  case marvelConstants.GET_COMIC_DETAILS_SUCCESS:
    return {
      loading: false,
      comic: action.comic,
    };
  case marvelConstants.GET_COMIC_DETAILS_FAILURE:
    return {
      loading: false,
      error: action.error,
      comic: [],
    };
  default:
    return state;
  }
}
