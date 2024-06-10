export class StateChangeError extends Error {
  constructor() {
    super();
    this.message = 'Impossible to change state';
    this.name = 'StateChangeError';
  }
}
