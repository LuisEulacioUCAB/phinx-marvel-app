import { alertConstants } from '../shared/alert.constants';
import {errors} from '../_components/toast';
import {success as toastSuccess} from '../_components/toast';

export const alertActions = {
  error,
  clear,
  success
};

function success(message) {
  toastSuccess(message);
  return { type: alertConstants.SUCCESS, message };
}


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
  errors(error);
  return { type: alertConstants.ERROR, message:error };
}

function clear() {
  return { type: alertConstants.CLEAR };
}