import { alertConstants } from '../shared/alert.constants';

/**
 * State for alerts.
 *
 * @param {object}state - State.
 * @param {object}action - Actions.
 * @returns {{type: string, message: *}|{}} Object.
 */
export function alert(state = {}, action) {
  switch (action.type) {
  case alertConstants.SUCCESS:
    return {
      type: 'alert-success',
      message: action.message,
    };
  case alertConstants.ERROR:
    return {
      type: 'alert-danger',
      message: action.message,
    };
  case alertConstants.CLEAR:
    return {};
  default:
    return state;
  }
}
