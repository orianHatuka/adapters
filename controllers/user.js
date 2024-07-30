import { generateToken, validateUser } from "../models/user.js";
import { connectToDB, closeConnection } from '../db/connectToDb.js';
import sql from 'msnodesqlv8'; // ייבוא חבילת msnodesqlv8

// הוספת משתמש חדש
export const addUser = async (req, res) => {
    const { Email, Name } = req.body;
    console.log("Received body:", req.body);

    if (!Name || !Email) {
        return res.status(400).json({ type: "missing parameters", message: "Please enter Email and user name" });
    }

    const { error } = validateUser({ Email, Name });
    if (error) {
        console.log("Validation error:", error);
        return res.status(400).json({ type: "validation error", message: error.details[0].message });
    }

    let connection;
    try {
        console.log("Attempting to connect to the database...");
        connection = await connectToDB();
        console.log("Connected to the database successfully");

        const existingUser = await findUserByEmail(connection, Email);
        console.log("Existing user:", existingUser);

        if (existingUser) {
            return res.status(409).json({ type: "user exists", message: "User already exists in the system" });
        }

        const newUser = await createUser(connection, { Email, Name });
        console.log("New user:", newUser);

        const token = generateToken(newUser.Name, newUser.Email);
        res.status(201).json({ Email: newUser.Email, Name: newUser.Name, token });
    } catch (err) {
        console.log("Error adding user:", err);
        res.status(400).json({ type: "invalid operation", message: "Cannot add this user", error: err.message });
    } finally {
        if (connection) await closeConnection(connection);
    }
};

export async function createUser(conn, user) {
    return new Promise((resolve, reject) => {
        const query = `
            EXEC CreateUser @Name = ?, @Email = ?
        `;
        conn.query(query, [user.Name, user.Email], (err, result) => {
            if (err) {
                console.log("Error in createUser procedure:", err);
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
}

export const login = async (req, res) => {
    const { Email } = req.body;

    if (!Email) {
        return res.status(400).json({ type: "missing parameters", message: "Please enter Email" });
    }

    let connection;
    try {
        connection = await connectToDB();
        const user = await findUserByEmail(connection, Email);
        if (!user) {
            return res.status(404).json({ type: "user not found", message: "User not found" });
        }

        const token = generateToken(user.Name, user.Email);
        res.json({ Email: user.Email, Name: user.Name, token });
    } catch (err) {
        res.status(400).json({ type: "invalid operation", message: "Unable to login user", error: err.message });
    } finally {
        if (connection) await closeConnection(connection);
    }
};

export async function findUserByEmail(conn, Email) {
    return new Promise((resolve, reject) => {
        const query = `
            EXEC FindUserByEmail @Email = ?
        `;
        conn.query(query, [Email], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result[0]);
            }
        });
    });
}

export const getAllUsersController = async (req, res) => {
    let connection;
    try {
        connection = await connectToDB();
        const allUsers = await getAllUsers(connection);
        res.json(allUsers);
    } catch (err) {
        res.status(400).json({ type: "invalid operation", message: "Unable to retrieve users", error: err.message });
    } finally {
        if (connection) await closeConnection(connection);
    }
};

export async function getAllUsers(conn) {
    return new Promise((resolve, reject) => {
        const query = `
            EXEC GetAllUsers
        `;
        conn.query(query, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
