class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode    = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError   extends AppError { constructor(msg = '잘못된 요청입니다.')         { super(msg, 400); } }
class UnauthorizedError extends AppError { constructor(msg = '인증이 필요합니다.')          { super(msg, 401); } }
class ForbiddenError    extends AppError { constructor(msg = '접근 권한이 없습니다.')        { super(msg, 403); } }
class NotFoundError     extends AppError { constructor(msg = '리소스를 찾을 수 없습니다.')   { super(msg, 404); } }
class ConflictError     extends AppError { constructor(msg = '이미 존재합니다.')            { super(msg, 409); } }

module.exports = { AppError, BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, ConflictError };
