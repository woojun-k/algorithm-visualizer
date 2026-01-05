export class EngineInitializationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EngineInitializationError";
  }
}
