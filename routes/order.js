import { verifyToken } from '../middleware/authentication.js';
import {createO, findOs, findO, updateO, deleteO} from '../controller/order/orderAPI.js'
import express from 'express'

const router = express.Router();

// Create a new product
router.post("/", verifyToken, createO);

// Retrieve all products
router.get("/", verifyToken, findOs);

// Retrieve a single product with id
router.get("/:id", verifyToken, findO);

// Update a product with id
router.put("/:id", verifyToken, updateO);

// Delete a product with id
router.delete("/:id", verifyToken, deleteO);

export default router ;