import { verifyToken } from '../middleware/authentication.js';
import {createC, findC, findCs, updateC, deleteC} from '../controller/category/categoryAPI.js';
import express from 'express';

const router = express.Router();
// Create a new category
router.post("/", verifyToken, createC);

// Retrieve all category
router.get("/", verifyToken, findCs);

// Retrieve a single category with id
router.get("/:id", verifyToken, findC);

// Update a category with id
router.put("/:id", verifyToken, updateC);

// Delete a category with id
router.delete("/:id", verifyToken, deleteC);

export default router;