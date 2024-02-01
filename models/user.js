import mongoose from "mongoose";
import Jwt  from "jsonwebtoken";
import Joi from "joi";
const userSchema = mongoose.Schema
(
    {
        userName : String,
        password : String,
        email : {type : String, unique : true},
        role : {type : String, default : "user"},
        joinDate : Date
    }
)

export const userModel = mongoose.model("users", userSchema)
export const userValidator = (_user) =>
 {
    const userValidationSchema = Joi.object().keys
    ({
        userName: Joi.string(),
        password: Joi.string(),
        email : Joi.string(),
        role : Joi.string(),
        joinDate : Joi.string().Date()
    })
    return userValidationSchema.validate(_user);
}
export const generateToken = (_id, role, userName) => 
{
    let token = Jwt.sign({_id, userName, role}, process.env.SECRET_JWT, {expiresIn : "1h"});
    return token;
}