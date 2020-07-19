import { combineReducers } from 'redux';
import { getallcharacters } from './getallcharacters.reducer';
import { alert } from './alert.reducer';
import { getcomics } from './getcomics.reducer';

const rootReducer = combineReducers({
  getallcharacters,
  getcomics,
  alert,
});

export { rootReducer };
