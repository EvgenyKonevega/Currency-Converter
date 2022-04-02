import BaseService from './base';

class ConversionService extends BaseService {

  constructor() {
    super('', 'ConversionService');
  }

  convert = async (searchParams) => this.axios.get('/latest', { params: searchParams });

}

export default ConversionService;