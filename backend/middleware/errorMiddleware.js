// Handles error if no other middleware takes care of it
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  // Pass error to next piece of middleware
  next(error);
}

// Overwrite Express's default error handler
const errorHandler = (err, req, res, next) => {
  // If status code is 200, change to 500
  // Any other code stays as it is
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Check for bad Mongoose _id (i.e. cast error)
  // There's a name and kind property on the err object to check
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    message = `Resource not found`;
    statusCode = 404;
  }

  // Assemble and send error response
  // Include stack trace in development mode
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? 'N/A' : err.stack
  })
}

export { notFound, errorHandler };