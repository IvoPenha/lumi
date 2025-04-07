import { HttpException } from './HttpException';

export class NotImplementedException extends HttpException {
  constructor(message = 'feature_not_implemented') {
    super(501, message);
  }
}
