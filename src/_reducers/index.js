import { combineReducers } from 'redux';
import { getAllCharacters } from './getAllCharacters.reducer';
import { alert } from './alert.reducer';
import { getComics } from './getComics.reducer';
import { getComicDetails } from './getComicDetails.reducer';
import {getAllComics} from './getAllComics.reducer';

const rootReducer = combineReducers({
  getAllCharacters,
  getComics,
  getComicDetails,
  alert,
  getAllComics
});

export { rootReducer };
