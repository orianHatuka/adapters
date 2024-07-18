import { connectToDB, closeConnection } from '../db/connectToDb.js';
import { createNotification, validateNotification } from '../models/notification.js';

export async function createNotificationController(req, res) {
  const { error } = validateNotification(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let connection;
  try {
    connection = await connectToDB();
    const result = await createNotification(connection, req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send('Error creating Notification');
  } finally {
    if (connection) await closeConnection(connection);
  }
}
// notification.js בתיקיית controllers
export const addNotification = (req, res) => {
  // הקוד של הפונקציה
};

export const deleteNotification = (req, res) => {
  // הקוד של הפונקציה
};

export const updateNotification = (req, res) => {
  // הקוד של הפונקציה
};

export const getAllNotifications = (req, res) => {
  // הקוד של הפונקציה
};
