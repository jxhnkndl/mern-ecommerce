// Improve error handling by checking for request errors as middleware and passing errors on to the
// next piece of middleware or route handler via next()
const asyncHandler = (fn) => async (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;