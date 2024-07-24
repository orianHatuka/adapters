import sql from 'msnodesqlv8';
import Jwt from "jsonwebtoken";
import Joi from "joi";



// Setting up validation for users
export const validateUser = (user) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required()
  });
  return schema.validate(user);
}

// Generate JWT token
export const generateToken = (userName, email) => {
  let token = Jwt.sign({ userName, email }, process.env.SECRET_JWT, { expiresIn: "1h" });
  return token;
}