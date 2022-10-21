export enum ErrorTypes {
  EmptyObject = 'EmptyObject',
  InvalidBody = 'InvalidBody',
  EntityNotFound = 'EntityNotFound',
  InvalidMongoId = 'InvalidMongoId',
}

type ErrorResponseObject = { 
  message: string;
  httpStatus: number
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
  InvalidMongoId: {
    message: 'Id must be a 24 characters hexadecimal',
    httpStatus: 400,
  },
};