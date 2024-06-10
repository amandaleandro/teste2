export class PbxUnavailableError extends Error {
  constructor() {
    super();
    this.message = 'PBX Unavailable';
    this.name = 'PbxUnavailableError';
  }
}
