// errors.ts

import { ErrorTypes } from '@/types/errorTypes';

export class NotAuthorizedError extends Error {
  constructor(message: string) {
    super('Not Authorized');
    this.name = ErrorTypes.NOT_AUTHORIZED;
  }
}

export class UnknownError extends Error {
  constructor(message: string) {
    super('An unknown error occurred');
    this.name = ErrorTypes.UNKNOWN_ERROR;
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super('Not found');
    this.name = ErrorTypes.NOT_FOUND;
  }
}

export class Forbidden extends Error {
  constructor(message: string) {
    super('Forbidden');
    this.name = ErrorTypes.FORBIDDEN;
    console.log('Forbidden');
  }
}