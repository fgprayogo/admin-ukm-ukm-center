import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import pendaftaranReducer from './pendaftaran/reducer';
import mahasiswaReducer from './mahasiswa/reducer'
import ukmReducer from './ukm/reducer'


import todoApp from './todo/reducer';
import chatApp from './chat/reducer';
import surveyListApp from './surveyList/reducer';
import surveyDetailApp from './surveyDetail/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  pendaftaranReducer,
  mahasiswaReducer,
  ukmReducer,


  todoApp,
  chatApp,
  surveyListApp,
  surveyDetailApp
});

export default reducers;