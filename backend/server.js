// ES6 module syntax because type="module" is set in package.json
import express from 'express';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Import environmental variables from .env
dotenv.config();

const PORT = process.env.PORT;

// Connect to database
connectDB();

const app = express();

// Body parsing middleware (JSON and Encoded Form object)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get root endpoint
app.get('/', (req, res) => {
  res.send('API is running...')
});

// Install app's product routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Set up error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));