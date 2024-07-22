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

// export const addNotification = (req, res) => {

// };

export function deleteNotification(conn, id) {
  const query = 'DELETE FROM notifications WHERE id = @id';
  return new Promise((resolve, reject) => {
    conn.query(query, { id }, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}


export function updateNotification(conn, id, notification) {
  const query = `
    UPDATE notifications
    SET NotificationType = @NotificationType, 
        StockName = @StockName, 
        MinRange = @MinRange, 
        MaxRange = @MaxRange, 
        UserEmail = @UserEmail
    OUTPUT INSERTED.*
    WHERE id = @id
  `;
  
  return new Promise((resolve, reject) => {
    conn.query(query, { ...notification, id }, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
}

export function getAllNotifications(conn) {
  const query = 'SELECT * FROM notifications';
  return new Promise((resolve, reject) => {
    conn.query(query, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

export function findNotificationById(conn, id) {
  const query = 'SELECT * FROM notifications WHERE id = @id';
  return new Promise((resolve, reject) => {
    conn.query(query, { id }, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
}