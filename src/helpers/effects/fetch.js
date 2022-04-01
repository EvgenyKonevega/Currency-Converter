import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const useFetching = (fetchCallback) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCallback());
  }, [dispatch, fetchCallback]);
};