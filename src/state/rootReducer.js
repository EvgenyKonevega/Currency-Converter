import { combineReducers } from 'redux';
import currenciesReducer from './currences/reducer';

const appReducer = combineReducers({ currenciesReducer });

export default appReducer;