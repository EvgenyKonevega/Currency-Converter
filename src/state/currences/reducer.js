import types from './types';

const initialState = {
  countries: {},
  currencies: {},
};

function currenciesReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_CURRENCIES_SUCCESS: {
      return {
        ...state,
        currencies: action.payload,
      };
    }
    case types.GET_COUNTRIES_SUCCESS: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    default:
      return state;
  }
}

export default currenciesReducer;
