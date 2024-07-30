import { connectToDB, closeConnection } from '../db/connectToDb.js';
import { validateNotification } from '../models/notification.js';

// פונקציה ליצירת Notification
export async function createNotification(conn, notification) {
  const query = `
    EXEC CreateNotification 
      @notificationType = ?, 
      @StockName = ?, 
      @MinRange = ?, 
      @MaxRange = ?, 
      @UserEmail = ?
  `;
  
  return new Promise((resolve, reject) => {
    conn.query(query, [
      notification.notificationType,
      notification.StockName,
      notification.MinRange,
      notification.MaxRange,
      notification.UserEmail
    ], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// פונקציה ליצירת Notification Controller
export async function createNotificationController(req, res) {
  const { error } = validateNotification(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let connection;
  try {
    connection = await connectToDB();
    const result = await createNotification(connection, req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating Notification:', err);
    res.status(500).send('Error creating Notification');
  } finally {
    if (connection) await closeConnection(connection);
  }
}

// פונקציה למחיקת Notification
export function deleteNotification(conn, notificationID) {
  const query = 'EXEC DeleteNotification @id = ?';  // שים לב לשם הפרמטר @id
  return new Promise((resolve, reject) => {
    conn.query(query, [notificationID], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}


// פונקציה למחיקת Notification Controller
export async function deleteNotificationController(req, res) {
  const notificationID = req.params.id;
  
  let connection;
  try {
    connection = await connectToDB();
    console.log("connection" + connection)
    const result = await deleteNotification(connection, notificationID);
    res.status(200).json(result);
  } catch (err) {
    console.log("connection" + connection)
    console.error('Error deleting Notification:', err);
    res.status(500).send('Error deleting Notification' + err);
  } finally {
    console.log("connection" + connection)
    if (connection) await closeConnection(connection);
  }
}
// פונקציה לעדכון Notification
export function updateNotification(conn, notificationID, notification) {
  // הגדרת השאילתה עם הפרמטרים המתאימים
  const query = `
    EXEC UpdateNotification
      @id = ?, 
      @NotificationType = ?, 
      @StockName = ?, 
      @MinRange = ?, 
      @MaxRange = ?, 
      @UserEmail = ?
  `;
  
  return new Promise((resolve, reject) => {
    // הדפס את השאילתה ואת הפרמטרים לצורכי ניפוי שגיאות
    console.log('Executing query:', query);
    console.log('With parameters:', [
      notificationID,
      notification.notificationType,
      notification.StockName,
      notification.MinRange,
      notification.MaxRange,
      notification.UserEmail
    ]);

    // הרצת השאילתה
    conn.query(query, [
      notificationID,
      notification.notificationType,
      notification.StockName,
      notification.MinRange,
      notification.MaxRange,
      notification.UserEmail
    ], (err, result) => {
      if (err) {
        // הדפס את השגיאה אם יש
        console.error('Query error:', err);
        reject(err);
      } else {
        // הדפס את התוצאה למטרות ניפוי שגיאות
        console.log('Query result:', result);
        
        // הנחה שהתוצאה מכילה את הנתונים המעודכנים
        // (מכיוון ש-OUTPUT INSERTED.* בפרוצדורה SQL שלך מחזיר את הרשומה המעודכנת)
        resolve(result[0]);
      }
    });
  });
}


// פונקציה לעדכון Notification Controller
export async function updateNotificationController(req, res) {
  const { error } = validateNotification(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const notificationID = req.params.id;
  const notification = req.body;

  let connection;
  try {
    connection = await connectToDB();
    const result = await updateNotification(connection, notificationID, notification);
    res.status(200).json(result);
  } catch (err) {
    console.error('Error updating Notification:', err);
    res.status(500).send('Error updating Notification');
  } finally {
    if (connection) await closeConnection(connection);
  }
}



// פונקציה לשליפת כל ה-Notifications
export function getAllNotifications(conn) {
  const query = 'EXEC GetAllNotifications';
  return new Promise((resolve, reject) => {
    conn.query(query, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// פונקציה לשליפת Notification לפי notificationID
export function findNotificationById(conn, notificationID) {
  const query = 'EXEC FindNotificationBynotificationID @notificationID = ?';
  return new Promise((resolve, reject) => {
    conn.query(query, [notificationID], (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
}
