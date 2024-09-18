import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  
  if (products) {
    return res.json(products);
  } else {
    res.status(404);
    return new Error('No products found');
  }
});

// @desc    Fetch single product by id
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    return new Error('Product not found')
  }
});

export { getProducts, getProductById }