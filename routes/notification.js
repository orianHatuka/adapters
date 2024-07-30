import express from "express";
import { deleteNotificationController, updateNotificationController, getAllNotifications ,findNotificationById ,createNotificationController} from "../controllers/notification.js";
// import { auth } from "../middleware/auth.js";

const router = express.Router();

// Add Notification - requires permissions (authentication)
router.post("/", createNotificationController);

// Delete Notification by ID - requires permissions (authentication)
router.delete("/:id", deleteNotificationController);

// Update notification by ID - requires permissions (authentication)
router.put("/:id", updateNotificationController);

// Get all Notifications - requires permissions (authentication)
router.get("/", getAllNotifications);

router.get("/:id",findNotificationById);

export default router;