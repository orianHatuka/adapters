import sql from 'msnodesqlv8';
import Joi from "joi";



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