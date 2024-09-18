import express from "express";
import { getProducts, getProductById } from "../controllers/productController.js";

// Init Express router
const router = express.Router();

// Configure routes
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;