export class HttpException extends Error {
  status: number;

  constructor(
    status: number,
    message: string | Record<any, any> = 'unspecified_error'
  ) {
    const msg = typeof message === 'string' ? message : JSON.stringify(message);
    super(msg);
    this.status = status;

    // Garante que o nome da exceção é mantido
    this.name = 'HttpException';

    // Captura a stack a partir daqui (mais limpa)
    Error.captureStackTrace?.(this, HttpException);
  }
}
