import express from "express";
import { addNotification, deleteNotification, updateNotification, getAllNotifications } from "../controllers/notification.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Add Notification - requires permissions (authentication)
router.post("/", auth, addNotification);

// Delete Notification by ID - requires permissions (authentication)
router.delete("/:id", auth, deleteNotification);

// Update notification by ID - requires permissions (authentication)
router.put("/:id", auth, updateNotification);

// Get all Notifications - requires permissions (authentication)
router.get("/", auth, getAllNotifications);

export default router;