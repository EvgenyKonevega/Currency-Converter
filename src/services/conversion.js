import BaseService from './base';

class ConversionService extends BaseService {

  constructor() {
    super('', 'ConversionService');
  }

  getAll = async () => this.axios.get('/latest');

}

export default ConversionService;