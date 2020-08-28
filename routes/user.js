import { verifyToken } from '../middleware/authentication.js';
import {Login, register, findU, findUs, updateU, deleteU, getResetPassword, resetPassword} from '../controller/user/userAPI.js';
import express from 'express';
 
const router = express.Router();

// Login
router.post("/login",Login);

// get reset password
router.get("/reset", getResetPassword)

// change reset password
router.put("/reset/:id", resetPassword)

// Create a new user
router.post("/", verifyToken, register);

// Retrieve all users
router.get("/", verifyToken, findUs);

// Retrieve a single user with id
router.get("/:id", verifyToken, findU);

// Update a user with id
router.put("/:id", verifyToken,updateU);

// Delete a user with id
router.delete("/:id", verifyToken, deleteU);

export default router;