// ES6 module syntax because type="module" is set in package.json
import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';

// Import environmental variables from .env
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...')
});

// All products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));