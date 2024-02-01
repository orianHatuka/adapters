import Joi from "joi";
import mongoose from "mongoose";
const productSchema = mongoose.Schema
(
    {
        productName : String, 
        descriptionProduct : String,
        manufacturingDateProduct : Date,
        pictureRoutingProduct : String,
        domainProduct : String
    }
)
export const productModel = mongoose.model("product", productSchema)
export const productValidator = (_product) =>
 {
    const productValidationSchema = Joi.object().keys
    ({
        productName: Joi.string().required(),
    })
    return productValidationSchema.validate(_product);
}