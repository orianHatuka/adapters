import express from "express";
import { addOrder, getAllOrders, getAllOrdersByUser, deleteOrder, updateOrder} from "../controllers/order.js";
import { auth, authAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/",authAdmin, getAllOrders);
router.get("/",auth ,getAllOrdersByUser);
router.delete("/:id",auth, deleteOrder);
router.post("/",auth, addOrder);
router.put("/:id",authAdmin, updateOrder);

export default router;