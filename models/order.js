import Joi from 'joi'
import mongoose from 'mongoose'
const minimalProduct = mongoose.Schema 
(
    {
    productName : String,
    productAmount : Number 
    }
)
const orderSchema = mongoose.Schema
(
    {
        userName : String,
        userId : String,
        orderDate : { type: Date, default: Date.now() },
        DueDate : { type : Date},
        orderAddress : String,
        product : [minimalProduct],
        onWayProduct : {type : Boolean, default : false  }
    }
)
export const orderSchemaModel = mongoose.model("order", orderSchema)
export const orderValidator = (_order) =>
 {
    const orderValidationSchema = Joi.object().keys
    ({
        orderDate: Joi.date(),
        DueDate : Joi.date(),
        orderAddress : Joi.string(),
        product : Joi.array(),
        onWayProduct : Joi.boolean()
    })
    return orderValidationSchema.validate(_order);
}