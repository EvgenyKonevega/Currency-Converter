import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import { useDispatch, useSelector } from 'react-redux';
import { useFetching } from '../../helpers/effects/fetch';
import { fetchCurrenciesData, fetchLastCurrency } from '../../state/currences/actions';

import CurrencyConverter from '../../components/CurrencyConverter';

const Home = () => {
  const dispatch = useDispatch();

  const { currencies, countries } = useSelector((state) => state.currenciesReducer);

  useFetching(fetchCurrenciesData);

  const onConverting = () => {
    dispatch(fetchLastCurrency());
  };

  const currenciesOptions = Object.keys(currencies).map((key) => ({
    id: key,
    label: `${key} - ${currencies[key].name}`,
  }));

  console.log(currenciesOptions);

  return (
    <div className="card-container">

      <div className="card">
        <div className="amount">
          <span>Amount</span>
          <Form.Control placeholder="Amount"/>
        </div>

        <div className="from">
          <span>From</span>
          <Typeahead
            id="currency"
            placeholder="Select"
            onChange={(selected) => {
              console.log(selected);
            }}
            options={currenciesOptions}
          />
        </div>

        <div className="to">
          <span>To</span>
          <Typeahead
            id="currency"
            placeholder="Select"
            onChange={(selected) => {
              console.log(selected);
            }}
            options={currenciesOptions}
          />
        </div>


      </div>
      <Button onClick={onConverting}> CLICK</Button>
      {/*<CurrencyConverter/>*/}
    </div>);
};

export default Home;