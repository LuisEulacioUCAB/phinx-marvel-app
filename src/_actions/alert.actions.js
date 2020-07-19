import { alertConstants } from '../shared/alert.constants';

export const alertActions = {
  error,
};

/**
 * Show error message.
 *
 * @param {object}message - Message.
 * @returns {{type: string, error: string}} Object.
 */
function error(message) {
  let error = '';

  if (Promise.resolve(message) === message) {
    message.then(function(value) {
      if (typeof value === 'object') {
        error = String(value.message);
        console.log('error', error);
      }
    });
  } else {
    error = String(message);
  }

  console.log('error', error);
  return { type: alertConstants.ERROR, error };
}
