import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions';
import { isStaging } from '../env';

type CommonErrorDto = {
  stack?: string;
  success: boolean;
  message: string;
};

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.stack);

  const status = err instanceof HttpException ? err.status : 500;
  const message = err.message || 'Internal Server Error';

  const errorData: CommonErrorDto = {
    success: false,
    message,
  };

  if (isStaging) errorData.stack = err?.stack;

  res.status(status).json(errorData).end();
};

export default errorMiddleware;
