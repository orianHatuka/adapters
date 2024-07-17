import { generateToken, userModel } from "../models/user.js";
import bcrypt from "bcryptjs";

// הוספת משתמש חדש
export const addUser = async (req, res) => {
    const { email, userName } = req.body;

    // בדיקה אם כל הפרמטרים קיימים
    if (!userName || !email) {
        return res.status(400).json({ type: "missing parameters", message: "Please enter email and user name" });
    }

    try {
        // בדיקה אם המשתמש כבר קיים
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ type: "user exists", message: "User already exists in the system" });
        }

        // יצירת משתמש חדש
        const newUser = new userModel({ email, userName });
        await newUser.save();

        // יצירת טוקן JWT
        const token = generateToken(newUser.userName, newUser.email);

        // החזרת התגובה עם פרטי המשתמש והטוקן
        res.status(201).json({ email: newUser.email, userName: newUser.userName, token });
    } catch (err) {
        res.status(400).json({ type: "invalid operation", message: "Cannot add this user" });
    }
};

// התחברות למערכת
export const login = async (req, res) => {
    const { email } = req.body;

    // בדיקה אם המייל נשלח
    if (!email) {
        return res.status(400).json({ type: "missing parameters", message: "Please enter email" });
    }

    try {
        // חיפוש המשתמש לפי המייל
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ type: "user not found", message: "User not found" });
        }

        // יצירת טוקן JWT
        const token = generateToken(user.userName, user.email);

        // החזרת התגובה עם פרטי המשתמש והטוקן
        res.json({ email: user.email, userName: user.userName, token });
    } catch (err) {
        res.status(400).json({ type: "invalid operation", message: "Unable to login user" });
    }
};

// קבלת כל המשתמשים
export const getAllUsers = async (req, res) => {
    try {
        // קבלת כל המשתמשים פרט לשדה הסיסמה
        const allUsers = await userModel.find({}, "-password");
        res.json(allUsers);
    } catch (err) {
        res.status(400).json({ type: "invalid operation", message: "Unable to retrieve users" });
    }
};
