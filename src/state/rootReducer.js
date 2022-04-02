import { combineReducers } from 'redux';
import currenciesReducer from './currences/reducer';

const appReducer = combineReducers({ currencies: currenciesReducer });

export default appReducer;