import { GraphQLError } from "graphql";

export enum CustomErrorCode {
  BAD_USER_INPUT = 'BAD_USER_INPUT',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

export class NotFoundError extends GraphQLError {
  constructor(message: string, itemId?: string, originalError?: Error) {
    super(message, {
      extensions: {
        code: CustomErrorCode.NOT_FOUND,
        http: { status: 404 },
        timeStamp: new Date().toISOString(),
        itemId
      }
    })
    Object.defineProperty(this, 'name', { value: 'NotFoundError' })
  }
}