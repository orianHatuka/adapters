import express from "express";
import { addUser, getAllUsersController, login, findUserByEmail } from "../controllers/user.js";
// import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllUsersController);
router.post("/", addUser);
router.post("/login", login);
router.get("/example@example.com", findUserByEmail)

export default router;