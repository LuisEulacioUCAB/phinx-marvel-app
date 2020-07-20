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
      characterList: [],
    };
  case marvelConstants.GET_ALL_CHARACTERS_SUCCESS:
    return {
      loading: false,
      characterList: action.characterList,
    };
  case marvelConstants.GET_ALL_CHARACTERS_FAILURE:
    return {
      loading: false,
      error: action.error,
      characterList: [],
    };
  default:
    return state;
  }
}
