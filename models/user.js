import sql from 'msnodesqlv8';
import Jwt from "jsonwebtoken";
import Joi from "joi";

// CRUD operations for users
export async function createUser(conn, user) {
  const query = `
    INSERT INTO Users (userName, email)
    OUTPUT INSERTED.id, INSERTED.userName, INSERTED.email
    VALUES (@userName, @email)
  `;
  
  return new Promise((resolve, reject) => {
    conn.query(query, user, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
}

export async function findUserByEmail(conn, email) {
  const query = 'SELECT id, userName, email FROM Users WHERE email = @email';
  return new Promise((resolve, reject) => {
    conn.query(query, { email }, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
}

export async function getAllUsers(conn) {
  const query = 'SELECT id, userName, email FROM Users';
  return new Promise((resolve, reject) => {
    conn.query(query, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

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