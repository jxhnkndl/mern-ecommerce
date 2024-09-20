import jwt from 'jsonwebtoken';

// Create JWT
const generateToken = (res, userId) => {
  // Generate JWT for auth
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Set JWT as HTTP only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    // Only make true if in development mode
    secure: process.env.NODE_ENV !== 'development',
    // Prevent XSS
    sameSite: 'strict',
    // Calculated as 30 days in milliseconds
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
}

export default generateToken;