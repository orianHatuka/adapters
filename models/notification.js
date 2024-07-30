import sql from 'msnodesqlv8';
import Joi from "joi";



export const validateNotification = (notification) => {
  const schema = Joi.object({
    notificationType: Joi.string().required(),
    StockName: Joi.string().required(),
    MinRange: Joi.number().required(),
    MaxRange: Joi.number().required(),
    UserEmail: Joi.string().email()
  });
  return schema.validate(notification);
}