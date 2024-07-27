import sql from 'msnodesqlv8';
import Jwt from "jsonwebtoken";
import Joi from "joi";



// Setting up validation for users
export const validateUser = (user) => {
  const schema = Joi.object({
    Name: Joi.string().required(),
    Email: Joi.string().email().required()
  });
  return schema.validate(user);
}

// Generate JWT token
export const generateToken = (Name, Email) => {
  let token = Jwt.sign({ Name, Email }, process.env.SECRET_JWT, { expiresIn: "1h" });
  return token;
}