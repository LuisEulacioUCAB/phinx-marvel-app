import {marvelConstants} from '../shared/marvel.constants';

/**
 * State for get all comics.
 *
 * @param {object}state - State.
 * @param {object}action - Actions.
 * @returns {{}} Object.
 */
export function getAllComics(state = {}, action) {
  switch (action.type) {
  case marvelConstants.GET_ALL_COMICS_REQUEST:
    return {
      loading:true,
      data:{
        comicsList: [],
        total : 0
      }
    };
  case marvelConstants.GET_ALL_COMICS_SUCCESS:
    return {
      loading: false,
      data: action.data
    };
  case marvelConstants.GET_ALL_COMICS_FAILURE:
    return {
      loading: false,
      error: action.error,
      data: {
        comicsList : [],
        total:0
      },
    };
  default:
    return {
      comicsList: []
    };
  
  }
}