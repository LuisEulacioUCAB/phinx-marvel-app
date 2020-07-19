import { marvelConstants } from '../shared/marvel.constants';

/**
 * State for get all characters.
 *
 * @param {object}state - State.
 * @param {object}action - Actions.
 * @returns {{}} Object.
 */
export function getallcharacters(state = {}, action) {
  switch (action.type) {
  case marvelConstants.GET_ALL_CHARACTERS_REQUEST:
    return {
      loading: true,
    };
  case marvelConstants.GET_ALL_CHARACTERS_SUCCESS:
    return {
      loading: false,
      charactersList: action.charactersList,
    };
  case marvelConstants.GET_ALL_CHARACTERS_FAILURE:
    return {
      loading: false,
      error: action.error,
    };
  default:
    return state;
  }
}
