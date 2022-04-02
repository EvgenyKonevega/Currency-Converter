import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { useSelector } from 'react-redux';
import { useFetching } from '../helpers/effects/fetch';
import { convertAction, fetchCurrenciesData } from '../state/currences/actions';

import { validateAmount } from '../helpers/validationHelper';
import Select from 'react-select';
import Loader from '../components/Loader';

const customStyles = {
  container: provided => ({
    ...provided,
    width: 250,
  }),
};

const Home = () => {
  const { currencies, rates, error, isLoading } = useSelector((state) => state.currencies);

  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  useFetching(fetchCurrenciesData);
  useFetching(convertAction);

  const currenciesOptions = Object.keys(currencies).map((key) => ({
    ...currencies[key],
    value: key,
    label: `${key} - ${currencies[key].name}`,
  }));

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const switchCurrencies = () => {
    const [from, to] = [toCurrency, fromCurrency];
    setFromCurrency(from);
    setToCurrency(to);
  };

  const validInput = fromCurrency?.value && toCurrency?.value && Number(amount);

  const calculateRate = (from, to) => ((amount * rates[to]) / rates[from]).toFixed(2);

  const composeResult = () => {
    if (!validInput) {
      return null;
    }

    const { value: fromValue, name: fromName, name_plural: fromNamePlural } = fromCurrency;
    const { value: toValue, name_plural: toNamePlural } = toCurrency;

    const rate = calculateRate(fromValue, toValue);

    const isOne = amount === '1';

    const baseCurrency = `${amount} ${isOne ? fromName : fromNamePlural} = `;
    const targetCurrency = `${rate} ${toNamePlural}`;

    const baseCurrencyElement = <p className="card-content-info-base">{baseCurrency}</p>;
    const targetCurrencyElement = <p className="card-content-info-target">{targetCurrency}</p>;

    return (
      <div className="card-content-info">
        {baseCurrencyElement}
        {targetCurrencyElement}
      </div>);
  };

  const composeHeader = () => {
    if (validInput) {
      const { value: fromValue, name_plural: fromNamePlural } = fromCurrency;
      const { value: toValue, name_plural: toNamePlural } = toCurrency;
      return `${amount} ${fromValue} to ${toValue} - Convert ${fromNamePlural} to ${toNamePlural} `;
    }
    return `Currency Converter`;
  };

  return (
    <div className="card-container">
      <h1 className="header">{composeHeader()}</h1>

      <div className="card">
        <div className="card-content">
          <div className="card-content-input-group">
            <div className="card-content-amount">
              <span>Amount</span>
              <Form.Control onChange={handleChangeAmount} placeholder="Amount"/>
              {!validateAmount(amount) && amount &&
                <p className="error-text">Amount should be a positive number!</p>}
            </div>

            <div className="card-content-from">
              <span>From</span>
              <Select
                styles={customStyles}
                placeholder="Select"
                onChange={setFromCurrency}
                value={fromCurrency}
                options={currenciesOptions}/>
            </div>

            <div className="card-content-switch">
              <button onClick={switchCurrencies} className="switch-currencies">
                <i className="fa fa-exchange"/>
              </button>
            </div>

            <div className="card-content-to">
              <span>To</span>
              <Select
                styles={customStyles}
                placeholder="Select"
                onChange={setToCurrency}
                value={toCurrency}
                options={currenciesOptions}/>
            </div>
          </div>

          {validInput ? composeResult() : null}

        </div>

        {isLoading && <Loader/>}
        {error && alert(error)}

      </div>
    </div>);
};

export default Home;