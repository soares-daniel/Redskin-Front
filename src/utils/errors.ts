// errors.ts

import { ErrorTypes } from '@/types/errorTypes';

export class NotAuthorizedError extends Error {
  constructor() {
    super('Not Authorized');
    this.name = ErrorTypes.NOT_AUTHORIZED;
  }
}

export class UnknownError extends Error {
  constructor() {
    super('An unknown error occurred');
    this.name = ErrorTypes.UNKNOWN_ERROR;
  }
}