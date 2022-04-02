import types from './types';

const initialState = {
  isLoading: false,
  error: '',
  countries: {},
  currencies: {},
  rates: {},
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

    case types.GET_RATES_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.GET_RATES_SUCCESS: {
      return {
        ...state,
        rates: action.payload,
        isLoading: false,
      };
    }

    case types.GET_RATES_ERROR: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default currenciesReducer;
