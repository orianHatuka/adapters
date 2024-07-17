import mongoose from "mongoose";
import { alertModel } from "../models/alert.js"; // מייבא את המודל

// הוספת התראה
export const addAlert = async (req, res) => {
    // פיצול הנתונים מהבקשה
    const { AlertType, StockName, MinRange, MaxRange, UserEmail } = req.body;

    try {
        // יצירת אובייקט חדש של התראה עם הנתונים שנשלחו
        const newAlert = new alertModel({
            AlertType,
            StockName,
            MinRange,
            MaxRange,
            UserEmail
        });

        // שמירה במסד הנתונים
        await newAlert.save();

        // החזרת התגובה עם ההתראה שנוספה
        res.status(201).json(newAlert);
    } catch (err) {
        // טיפול בשגיאות ושילוח תשובה למשתמש
        res.status(400).json({ type: "invalid operation", message: "Cannot add this alert" });
    }
};

// מחיקת התראה
export const deleteAlert = async (req, res) => {
    const { id } = req.params;

    try {
        // בדיקה אם ה-ID תקין
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ type: "not valid id", message: "id not in right format" });
        }

        // חיפוש ומחיקת ההתראה על פי ה-ID
        const alert = await alertModel.findByIdAndDelete(id);

        // בדיקה אם ההתראה נמצאה ומחוקה בהצלחה
        if (!alert) {
            return res.status(404).json({ type: "no alert to delete", message: "no alert with such id to delete" });
        }

        // החזרת התגובה עם ההתראה שנמחקה
        return res.json(alert);
    } catch (err) {
        // טיפול בשגיאות ושילוח תשובה למשתמש
        console.log(err);
        res.status(400).json({ type: "invalid operation", message: "sorry cannot delete alert" });
    }
};

// עדכון התראה
export const updateAlert = async (req, res) => {
    const { id } = req.params;

    // בדיקה אם ה-ID תקין
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ type: "not valid id", message: "id not in right format" });
    }

    try {
        // חיפוש ההתראה על פי ה-ID
        const alert = await alertModel.findById(id);

        // בדיקה אם ההתראה נמצאה
        if (!alert) {
            return res.status(404).json({ type: "alert not found", message: "no alert with such id" });
        }

        // עדכון ההתראה עם הנתונים שנשלחו
        const updated = await alertModel.findByIdAndUpdate(id, req.body, { new: true });

        // החזרת התגובה עם ההתראה המעודכנת
        return res.json(updated);
    } catch (err) {
        // טיפול בשגיאות ושילוח תשובה למשתמש
        console.log(err);
        res.status(400).json({ type: "invalid operation", message: "sorry cannot update alert" });
    }
};
