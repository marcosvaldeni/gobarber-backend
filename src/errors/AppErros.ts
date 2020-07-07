class AppError {
  public readonly messate: string;

  public readonly statusCode: number;

  constructor(message: string, statusCodes = 400) {
    this.messate = message;
    this.statusCode = statusCodes;
  }
}

export default AppError;
