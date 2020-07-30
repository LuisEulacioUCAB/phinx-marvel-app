import moment from 'moment';

/**
 * Reduce amount word on texts and add link for view comic details .
 *
 * @param {string}text - Text.
 * @param {number}amountWords - Amount words.
 * @returns {string} Text.
 */

export const reduceText = (text, amountWords) => {
  if (text.length > amountWords) {
    let newText = text.split(' ');
    return newText.slice(0, amountWords).join(' ');
  }

  return text;
};

/**
 * Generate query for variables filter.
 *
 * @param {object}filter - Filter Query.
 * @returns {string} Query.
 */
export const generateFilterQuery = (filter) => {
  let query = '';
  Object.keys(filter).forEach((value) => {
    if (filter[value].length) {
      query += `&${value}=${filter[value]}`;
    }
  });

  return query;
};

/**
 * Generate query simple query.
 *
 * @param {string}filter -  Filter.
 * @returns {string} Query.
 */
export const generateQuery = (filter) =>{
  let query = '';
  if(typeof filter === 'string' && filter.length){
    query += `&character=${filter}`;
  }

  return query;
};

/**
 * Get creator by role.
 *
 * @param {Array}creators - Creators Array.
 * @param {string}role - Creator role.
 * @returns {*} Array.
 */
export const getCreatorRole = (creators, role) => {
  return creators.find((creator) => creator.role === role);
};

/**
 * Get date by type.
 *
 * @param {Array}dates - Dates array.
 * @param {string}type - Date type.
 * @returns {*}Object.
 */
export const getDate = (dates, type) => {
  return dates.find((date) => date.type === type);
};

/**
 * Format date.
 *
 * @param {string}date - Date to format.
 * @param {string}format - Format.
 * @returns {string} Date formatted.
 */
export const formatDate = (date, format) => {
  return moment(date).format(format);
};

/**
 * Get data from local storage.
 *
 * @param {string}item - Item save on localstorage.
 * @param {object}objectState - Object from state.
 * @returns {any} Any.
 */
export const getObjectFromLocalStorage = (item, objectState) => {
  return localStorage.getItem(item) ?
    JSON.parse(localStorage.getItem(item)) :
    objectState;
};
/**
 * Set Data to localstorage.
 *
 * @param {string}item - Item save on localstorage.
 * @param {object}objectState - Object from state.
 */
export const setObjectToLocalStorage = (item, objectState) => {
  localStorage.setItem(item, objectState);

};
