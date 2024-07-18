import { generateToken, createUser, findUserByEmail, getAllUsers, validateUser } from "../models/user.js";
import { connectToDB, closeConnection } from '../db/connection.js';

// Adding a new user
export const addUser = async (req, res) => {
    const { email, userName } = req.body;
    
    // Check if all parameters exist
    if (!userName || !email) {
      return res.status(400).json({ type: "missing parameters", message: "Please enter email and user name" });
    }

    const { error } = validateUser({ email, userName });
    if (error) return res.status(400).json({ type: "validation error", message: error.details[0].message });

    let connection;
    try {
      connection = await connectToDB();

      // Check if the user already exists
      const existingUser = await findUserByEmail(connection, email);
      if (existingUser) {
        return res.status(409).json({ type: "user exists", message: "User already exists in the system" });
      }

      // Create a new user
      const newUser = await createUser(connection, { email, userName });

      // Generate JWT token
      const token = generateToken(newUser.userName, newUser.email);

      // Return the response with the user and token details
      res.status(201).json({ email: newUser.email, userName: newUser.userName, token });
    } catch (err) {
      res.status(400).json({ type: "invalid operation", message: "Cannot add this user" });
    } finally {
      if (connection) await closeConnection(connection);
    }
};

// Login to the system
export const login = async (req, res) => {
    const { email } = req.body;
    
    // Check if the email was sent
    if (!email) {
      return res.status(400).json({ type: "missing parameters", message: "Please enter email" });
    }

    let connection;
    try {
      connection = await connectToDB();

      // Search the user by email
      const user = await findUserByEmail(connection, email);
      if (!user) {
        return res.status(404).json({ type: "user not found", message: "User not found" });
      }

      // Generate JWT token
      const token = generateToken(user.userName, user.email);

      // Return the response with the user and token details
      res.json({ email: user.email, userName: user.userName, token });
    } catch (err) {
      res.status(400).json({ type: "invalid operation", message: "Unable to login user" });
    } finally {
      if (connection) await closeConnection(connection);
    }
};

// Get all users
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