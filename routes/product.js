import { verifyToken } from '../middleware/authentication.js';
import {createP, findP, findPs, updateP, deleteP} from '../controller/product/productAPI.js';
import express from 'express';

const router = express.Router();

// Create a new product
router.post("/", verifyToken, createP);

// Retrieve all products
router.get("/", verifyToken, findPs);

// Retrieve a single product with id
router.get("/:id", verifyToken, findP);

// Update a product with id
router.put("/:id", verifyToken, updateP);

// Delete a product with id
router.delete("/:id", verifyToken, deleteP);

export default router;