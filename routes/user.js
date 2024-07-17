import express  from "express";
import { addUser, getAllUsers, login } from "../controllers/user.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

//router.get("/",auth,getAllUsers);
router.get("/",getAllUsers);
router.post("/", addUser);
router.post("/login", login);
export default router;