import { marvelConstants } from '../shared/marvel.constants';
import { marvelService } from '../_services/marvel.service';
import { alertActions } from './alert.actions';

export const marvelActions = {
  getAllCharacters,
  getComics,
  getComicDetails,
  getAllComics
};

/**
 *  Get all characters.
 *
 * @param {object}filter - Filter.
 * @param {number}offset - Offset.
 * @param {number}limit - Limit.
 * @param {string}character - Character.
 * @param {object}comic - Comic.
 * @returns {function(...[*]=)} Dispatch Functions.
 */
function getAllCharacters(filter, offset, limit, character= '', comic = null) {
  return (dispatch) => {
    dispatch(request(filter));
    marvelService.getAllCharacters(filter, offset, limit).then(
      (characters) => {
        const {
          data: { results: characterList },
        } = characters;
        const data = {
          characterList,
          total : characters.data.total
        };
        dispatch(success(data));
      },

      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };

  /**
   * Function for request.
   *
   * @param {object}filter - Filter object.
   * @returns {{filter: *, type: string}} Object.
   */
  function request(filter) {
    return { type: marvelConstants.GET_ALL_CHARACTERS_REQUEST, filter };
  }

  /**
   * Functions for dispatch success.
   *
   * @param {object}characterList - Object.
   * @returns {{charactersList: *, type: string}} Object.
   */
  function success(data) {
    return { type: marvelConstants.GET_ALL_CHARACTERS_SUCCESS, data };
  }

  /**
   * Functions for dispatch failure.
   *
   * @param {object}error - Object message error.
   * @returns {{type: string, error: *}} Object.
   */
  function failure(error) {
    return { type: marvelConstants.GET_ALL_CHARACTERS_FAILURE, error };
  }
}

/**
 * Get comic by comic id.
 *
 * @param {number}id - Comic id.
 * @returns {function(...[*]=)} Object.
 */
function getComicDetails(id) {
  return (dispatch) => {
    dispatch(request(id));
    marvelService.getComicDetails(id).then(
      (comicDetails) => {
        const {
          data: { results: comic },
        } = comicDetails;
        dispatch(success(comic));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };

  /**
   * Function for dispatch request.
   *
   * @param {number}id - Id.
   * @returns {{id: *, type: string}} Object.
   */
  function request(id) {
    return { type: marvelConstants.GET_COMIC_DETAILS_REQUEST, id };
  }

  /**
   * Function for dispatch success.
   *
   * @param {object}comic - Comic Details.
   * @returns {{type: string, comicsList: *}} Object.
   */
  function success(comic) {
    return { type: marvelConstants.GET_COMIC_DETAILS_SUCCESS, comic };
  }

  /**
   * Function for dispatch failure.
   *
   * @param {object}error - Object message error.
   * @returns {{type: string, error: *}} Object.
   */
  function failure(error) {
    return { type: marvelConstants.GET_COMIC_DETAILS_FAILURE, error };
  }
}

/**
 * Get comic by character id.
 *
 * @param {number}id - Character id.
 * @returns {function(...[*]=)} Object.
 */
function getComics(id) {
  return (dispatch) => {
    dispatch(request(id));
    marvelService.getComics(id).then(
      (comics) => {
        const {
          data: { results: comicsList },
        } = comics;
        dispatch(success(comicsList));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      },
    );
  };

  /**
   * Function for dispatch request.
   *
   * @param {number}id - Id.
   * @returns {{id: *, type: string}} Object.
   */
  function request(id) {
    return { type: marvelConstants.GET_COMICS_REQUEST, id };
  }

  /**
   * Function for dispatch success.
   *
   * @param {object}comicsList - Comic List.
   * @returns {{type: string, comicsList: *}} Object.
   */
  function success(comicsList) {
    return { type: marvelConstants.GET_COMICS_SUCCESS, comicsList };
  }

  /**
   * Function for dispatch failure.
   *
   * @param {object}error - Object message error.
   * @returns {{type: string, error: *}} Object.
   */
  function failure(error) {
    return { type: marvelConstants.GET_COMICS_FAILURE, error };
  }
}

/**
 *
 * @param filter
 * @param offset
 * @param limit
 * @returns {function(...[*]=)}
 */
function getAllComics(filter, offset, limit) {

  return (dispatch) => {
    dispatch(request(filter));
    marvelService.getAllComics(filter, offset, limit).then(
      (comics) => {
        const {
          data: { results: comicsList}
        } = comics;

        const data = {
          comicsList,
          total: comics.data.total
        };
        dispatch(success(data));
      },
      (error) => {
        dispatch(failure(error));
        dispatch(alertActions.error(error));
      }
    );
  };


  function request(filter) {
    return { type : marvelConstants.GET_ALL_COMICS_REQUEST, filter};
  }

  function success(data) {
    return { type : marvelConstants.GET_ALL_COMICS_SUCCESS, data};
  }

  function failure(error) {
    return { type : marvelConstants.GET_ALL_COMICS_FAILURE, error};
  }

}