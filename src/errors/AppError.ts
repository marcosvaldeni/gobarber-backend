class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCodes = 400) {
    this.message = message;
    this.statusCode = statusCodes;
  }
}

export default AppError;
