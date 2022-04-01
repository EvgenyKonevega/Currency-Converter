import Axios from 'axios';
import ServerError from '../assets/errors/ServerError';

const onResponseSuccess = (response) => response.data;

const onResponseFailure = (serviceName) => (error) => {

  const errorMessage = getErrorMessage(error);
  console.warn(`[${serviceName}]: ${errorMessage}`);
  throw new ServerError(errorMessage);
};

function getErrorMessage(error) {
  const { response, message } = error;

  if (response) {
    return response?.data?.message || `${response.statusText} (${response.status})`;
  }

  return message;
}

class BaseService {
  constructor(url, name = 'BaseService') {
    const API_URL = process.env.REACT_APP_FIXER_API_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;
    // Create instance
    this.axios = Axios.create({
      baseURL: `${API_URL}${url}`,
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        access_key: API_KEY,
      },
    });

    this.name = name;

    // Attach interceptor for response error logging
    this.axios.interceptors.response.use(
      onResponseSuccess,
      onResponseFailure(this.name),
    );
  }
}

export default BaseService;

