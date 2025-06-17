export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  const errorResponse = {
    success: false,
    message,
  };
  if (Array.isArray(err.errors) && err.errors.length > 0) {
    errorResponse.errors = err.errors;
  }
  if (process.env.NODE_ENV !== 'production') {
    errorResponse.stack = err.stack;
  }
  res.status(statusCode).json(errorResponse);
};
