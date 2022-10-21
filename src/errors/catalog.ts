export enum ErrorTypes {
  EmptyObject = 'EmptyObject',
  InvalidBody = 'InvalidBody',
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
  ObjectNotFound = 'ObjectNotFound',
}

type ErrorResponseObject = { 
  message: string;
  httpStatus: number;
  error?: string;
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject

};

export const errorCatalog: ErrorCatalog = {
  EntityNotFound: {
    message: 'Entity not found',
    httpStatus: 404,
  },
  EmptyObject: {
    message: '',
    httpStatus: 400,
  },
  InvalidBody: {
    message: '',
    httpStatus: 400,
  },
  ObjectNotFound: {
    message: 'Object not found',
    httpStatus: 404,
    error: 'Object not found',
  },
  InvalidMongoId: {
    message: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
};