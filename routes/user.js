import express from "express";
import { addUser, getAllUsersController, login } from "../controllers/user.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getAllUsersController);
router.post("/", addUser);
router.post("/login", login);

export default router;