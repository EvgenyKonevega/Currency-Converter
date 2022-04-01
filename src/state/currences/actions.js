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

export const fetchCurrenciesData = () => (dispatch) => {
  const { currencies, countries } = getCurrencies();
  dispatch(getCurrenciesSuccess(currencies));
  dispatch(getCountriesSuccess(countries));
};

export const fetchLastCurrency = () => async (dispatch) => {
  const data = await service.getAll();
  console.log(data);
};