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
      data: {
        characterList : [],
        total:0
      },
    };
  case marvelConstants.GET_ALL_CHARACTERS_SUCCESS:
    return {
      loading: false,
      data: action.data,
    };
  case marvelConstants.GET_ALL_CHARACTERS_FAILURE:
    return {
      loading: false,
      error: action.error,
      data: {
        characterList : [],
        total:0
      },
    };
  default:
    return state;
  }
}
