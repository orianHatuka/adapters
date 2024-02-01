import express from "express";
import { addProduct, getProductById, deleteProduct, updateProduct, getAllProduct} from "../controllers/product.js";
import { authAdmin } from "../middleware/auth.js";
const router = express.Router();

router.get("/", getAllProduct);
router.get("/:id", getProductById);
router.delete("/:id",authAdmin, deleteProduct);
router.post("/",authAdmin, addProduct);
router.put("/:id",authAdmin, updateProduct);

export default router;