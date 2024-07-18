import { connectToDB, closeConnection } from '../db/connection';
import { createNotification, validateNotification } from '../models/notification';

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