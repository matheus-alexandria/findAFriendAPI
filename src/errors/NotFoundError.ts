export class NotFoundError extends Error {
  constructor(message = 'Not found elements.') {
    super(message);
  }
}