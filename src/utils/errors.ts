// errors.ts

import { ErrorTypes } from '@/types/errorTypes';

export class NotAuthorizedError extends Error {
  constructor() {
    super("You're not authorized to access this resource, please login");
    this.name = ErrorTypes.NOT_AUTHORIZED;
  }
}

export class UnknownError extends Error {
  constructor() {
    super('An unknown error occurred');
    this.name = ErrorTypes.UNKNOWN_ERROR;
  }
}

export class NotFoundError extends Error {
  constructor() {
    super("The resource you're looking for was not found");
    this.name = ErrorTypes.NOT_FOUND;
  }
}

export class Forbidden extends Error {
  constructor() {
    super("You don't have permission to access this resource");
    this.name = ErrorTypes.FORBIDDEN;
    console.log('Forbidden');
  }
}