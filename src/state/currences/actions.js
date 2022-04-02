import { getCurrencies } from '../../assets/currences';
import types from './types';
import ConversionService from '../../services/conversion';

const service = new ConversionService();

const getCurrenciesSuccess = (data) => ({
  type: types.GET_CURRENCIES_SUCCESS,
  payload: data,
});

const getCountriesSuccess = (data) => ({
  type: types.GET_COUNTRIES_SUCCESS,
  payload: data,
});

export const getRatesRequest = () => ({
  type: types.GET_RATES_REQUEST,
});

export const getRatesSuccess = (rates) => ({
  type: types.GET_RATES_SUCCESS,
  payload: rates,
});

export const getRatesError = (error) => ({
  type: types.GET_RATES_ERROR,
  payload: error,
});

export const fetchCurrenciesData = () => (dispatch) => {
  const { currencies, countries } = getCurrencies();
  dispatch(getCurrenciesSuccess(currencies));
  dispatch(getCountriesSuccess(countries));
};

export const convertAction = (searchParams) => async (dispatch) => {
  dispatch(getRatesRequest());
  try {
    const data = await service.convert(searchParams);

    if (data.success) {
      dispatch(getRatesSuccess(data.rates));
    } else {
      const message = data.error?.info || data.error.type;
      dispatch(getRatesError(message));
    }
  } catch (e) {
    dispatch(getRatesError(e.message));
  }
};