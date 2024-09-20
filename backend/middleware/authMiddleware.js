import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/User.js';

// Protect routes from unauthentciated users
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from HTTP only cookie
  token = req.cookies.jwt;

  if (token) {
    // Decode JWT, find the user matching the ID on the JWT, add that user data to req, hit next middleware
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Token Failed: Not Authorized')
    }
  } else {
    res.status(401);
    throw new Error('Missing Token: Not Authorized');
  }
});

// Admin user middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin user');
  }
}

export { protect, admin };