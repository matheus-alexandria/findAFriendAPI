export class NotAuthorized extends Error {
  constructor(message = 'Not authorized.') {
    super(message);
  }
}