import mongoose from "mongoose";
import Jwt  from "jsonwebtoken";
import Joi from "joi";
const alertSchema = mongoose.Schema
(
    {
    
        alertName: String,
        type : String
    }
)

export const alertModel = mongoose.model("alerts", alertSchema)
export const alertValidator = (_alert) =>
 {
    const alertValidationSchema = Joi.object().keys
    ({
        alertName: Joi.string(),
        type : Joi.string()
    })
    return alertValidationSchema.validate(_alert);
}
