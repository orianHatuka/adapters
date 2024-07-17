import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import Joi from "joi";

// הגדרת הסכמה עבור משתמשים
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true }
}, {
    timestamps: true // מאפשר יצירת תאריכים אוטומטיים עבור יצירה ועדכון
});

export const userModel = mongoose.model("User", userSchema);

// הגדרת הוולידציה עבור משתמשים
export const userValidator = (_user) => {
    const userValidationSchema = Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().email().required() // ודא שהמייל הוא בפורמט תקין
    });
    return userValidationSchema.validate(_user);
}

// יצירת טוקן JWT
export const generateToken = (userName, email) => {
    let token = Jwt.sign({ userName, email }, process.env.SECRET_JWT, { expiresIn: "1h" });
    return token;
}
