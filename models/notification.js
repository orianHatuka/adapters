import sql from 'msnodesqlv8';
import Joi from "joi";

export async function createNotification(conn, alert) {
  const query = `
    INSERT INTO notification (NotificationType, StockName, MinRange, MaxRange, UserEmail)
    VALUES (@NotificationType, @StockName, @MinRange, @MaxRange, @UserEmail)
  `;
  
  return new Promise((resolve, reject) => {
    conn.query(query, notification, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}


export const validateNotification = (alert) => {
  const schema = Joi.object({
    AlertType: Joi.string().required(),
    StockName: Joi.string().required(),
    MinRange: Joi.number().required(),
    MaxRange: Joi.number().required(),
    UserEmail: Joi.string().email().required()
  });
  return schema.validate(notification);
}