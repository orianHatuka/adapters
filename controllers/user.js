import { generateToken, validateUser } from "../models/user.js";
import { connectToDB, closeConnection } from '../db/connectToDb.js';


// שאילתות של יצירה ושליפה של משתמש
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



// הוספת משתמש חדש
export const addUser = async (req, res) => {
    const { email, userName } = req.body;
    // בדיקה אם כל הפרמטרים קיימים
    if (!userName || !email) {
      return res.status(400).json({ type: "missing parameters", message: "Please enter email and user name" });
    }
    const { error } = validateUser({ email, userName });
    if (error) return res.status(400).json({ type: "validation error", message: error.details[0].message });
    let connection;
    try {
      connection = await connectToDB();
      // בדיקה אם המשתמש קיים כבר
      const existingUser = await findUserByEmail(connection, email);
      if (existingUser) {
        return res.status(409).json({ type: "user exists", message: "User already exists in the system" });
      }
      // יוצר משתמש חדש
      const newUser = await createUser(connection, { email, userName });
      // Generate JWT token
      const token = generateToken(newUser.userName, newUser.email);
      // מחזיר את פירטי המשתמש
      res.status(201).json({ email: newUser.email, userName: newUser.userName, token });
    } catch (err) {
      res.status(400).json({ type: "invalid operation", message: "Cannot add this user" });
    } finally {
      if (connection) await closeConnection(connection);
    }
};

// חיבור למערכת
export const login = async (req, res) => {
    const { email } = req.body;
    // בדוק אם האימייל נשלח
    if (!email) {
      return res.status(400).json({ type: "missing parameters", message: "Please enter email" });
    }
    let connection;
    try {
      connection = await connectToDB();
      // חפש את המשתמש במייל
      const user = await findUserByEmail(connection, email);
      if (!user) {
        return res.status(404).json({ type: "user not found", message: "User not found" });
      }
      // Generate JWT token
      const token = generateToken(user.userName, user.email);
      // החזר את התגובה עם פרטי המשתמש 
      res.json({ email: user.email, userName: user.userName, token });
    } catch (err) {
      res.status(400).json({ type: "invalid operation", message: "Unable to login user" });
    } finally {
      if (connection) await closeConnection(connection);
    }
};

//שליפנ של כל המשתמשים
export const getAllUsersController = async (req, res) => {
    let connection;
    try {
      connection = await connectToDB();
      // Get all users
      const allUsers = await getAllUsers(connection);
      res.json(allUsers);
    } catch (err) {
      res.status(400).json({ type: "invalid operation", message: "Unable to retrieve users" });
    } finally {
      if (connection) await closeConnection(connection);
    }
};