import mongoose from "mongoose";
import Joi from "joi";

// הגדרת הסכמה עבור התראות
const alertSchema = new mongoose.Schema({
    AlertType: { type: String, required: true },
    StockName: { type: String, required: true },
    MinRange: { type: Number, required: true },
    MaxRange: { type: Number, required: true },
    UserEmail: { type: String, ref: 'User', required: true }
}, {
    timestamps: true // מאפשר יצירת תאריכים אוטומטיים עבור יצירה ועדכון
});

export const alertModel = mongoose.model("Alert", alertSchema);

// הגדרת הוולידציה עבור התראות
export const alertValidator = (_alert) => {
    const alertValidationSchema = Joi.object({
        AlertType: Joi.string().required(),
        StockName: Joi.string().required(),
        MinRange: Joi.number().required(),
        MaxRange: Joi.number().required(),
        UserEmail: Joi.string().email().required() // ודא שהמייל הוא בפורמט תקין
    });
    return alertValidationSchema.validate(_alert);
}

