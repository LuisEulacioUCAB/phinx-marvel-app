import md5 from 'md5';
import { generateFilterQuery } from '../shared/utils';
const URL = process.env.REACT_APP_URL_MARVEL;
const API_PUBLIC_KEY = process.env.REACT_APP_API_PUBLIC_KEY;
const API_PRIVATE_KEY = process.env.REACT_APP_API_PRIVATE_KEY;
const TS = process.env.REACT_APP_API_TS;
const HASH = md5(`${TS}${API_PRIVATE_KEY}${API_PUBLIC_KEY}`);

//For create hash visit https://www.md5hashgenerator.com/ and insert TS + API_PRIVATE_KEY + API_PUBLIC_KEY
export const marvelService = {
  getAllCharacters,
  getComics,
  getComicDetails,
  getAllComics
};

/**
 * Get all characters from Marvel Api.
 *
 * @param {object}filter - Filter.
 * @param {number}offset - Offset.
 * @param {number}limit - Limit.
 * @returns {Promise<Response>} Promise.
 */
function getAllCharacters(filter, offset, limit) {
  const requestOptions = {
    method: 'GET',
  };
  const query = generateFilterQuery(filter);

  return fetch(
    URL +
      `/v1/public/characters?apikey=${API_PUBLIC_KEY}&ts=${TS}&hash=${HASH}&offset=${offset}&limit=${limit}` +
      query,
    requestOptions,
  ).then(handleResponse);
}

/**
 * Get comics by Character id.
 *
 * @param {number}id - Character id.
 * @returns {Promise<Response>} Promise.
 */
function getComics(id) {
  const requestOptions = {
    method: 'GET',
  };
  //"http://gateway.marvel.com/v1/public/characters/1011334/comics"
  return fetch(
    URL + `/v1/public/characters/${id}/comics?apikey=${API_PUBLIC_KEY}&ts=${TS}&hash=${HASH}`,
    requestOptions,
  ).then(handleResponse);
}

/**
 * Return Json from promise.
 *
 * @param {object}response - Response data from Marvel Api.
 * @returns {Promise<Response>} Promise.
 */
function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.json());
  }
  return response.json();
}

/**
 * Get comics by id.
 *
 * @param {number}id - Comic id.
 * @returns {Promise<Response>} Promise.
 */
function getComicDetails(id) {
  const requestOptions = {
    method: 'GET',
  };
  //"http://gateway.marvel.com/v1/public/characters/1011334/comics"
  return fetch(
    URL + `/v1/public/comics/${id}?apikey=${API_PUBLIC_KEY}&ts=${TS}&hash=${HASH}`,
    requestOptions,
  ).then(handleResponse);
}

/**
 * Get all comics.
 *
 * @param {object}filter - Filter by comic title.
 * @param {number}offset - Offset.
 * @param {number}limit - Limit.
 * @returns {Promise<Response>} Promise.
 */
function getAllComics(filter, offset, limit) {
  const requestOptions = {
    method: 'GET',
  };
  const query = generateFilterQuery(filter);

  return fetch(
    URL + `/v1/public/comics?apikey=${API_PUBLIC_KEY}&ts=${TS}&hash=${HASH}&offset=${offset}&limit=${limit}` + query,
    requestOptions,
  ).then(handleResponse);
}