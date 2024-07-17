import express from "express";
import { addAlert, deleteAlert, updateAlert } from "../controllers/alert.js";
import { auth } from "../middleware/auth.js"; 

const router = express.Router();

// // הוספת התראה - דורש הרשאות (אימות)
// router.post("/", auth, addAlert);

// // מחיקת התראה לפי ID - דורש הרשאות (אימות)
// router.delete("/:id", auth, deleteAlert);

// // עדכון התראה לפי ID - דורש הרשאות (אימות)
// router.put("/:id", auth, updateAlert);

// // קבלת כל ההתראות - ניתן להוסיף הגנה לפי הצורך
// router.get("/", auth, getAllAlerts);

// הוספת התראה - דורש הרשאות (אימות)
router.post("/",  addAlert);

// מחיקת התראה לפי ID - דורש הרשאות (אימות)
router.delete("/:id",deleteAlert);

// עדכון התראה לפי ID - דורש הרשאות (אימות)
router.put("/:id", updateAlert);


export default router;
