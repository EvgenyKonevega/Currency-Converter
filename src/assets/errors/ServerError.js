export default class ServerError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'ServerError';
  }
}
