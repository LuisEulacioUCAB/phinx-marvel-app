import { combineReducers } from 'redux';
import { getallcharacters } from './getallcharacters.reducer';
import { alert } from './alert.reducer';
import { getcomics } from './getcomics.reducer';
import { getcomicdetails } from './getcomicdetails.reducer';

const rootReducer = combineReducers({
  getallcharacters,
  getcomics,
  getcomicdetails,
  alert,
});

export { rootReducer };
