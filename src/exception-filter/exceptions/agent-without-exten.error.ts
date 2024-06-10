export class AgentWithoutExtenError extends Error {
  constructor() {
    super();
    this.message = 'Agent without exten';
    this.name = 'AgentWithoutExtenError';
  }
}
