export class AgentNotFoundError extends Error {
  constructor() {
    super();
    this.message = 'Agent not found';
    this.name = 'AgentNotFoundError';
  }
}
