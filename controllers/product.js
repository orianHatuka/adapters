import mongoose from "mongoose";
import { productModel, productValidator } from "../models/product.js"
export const getAllProduct = async (req, res, next) => {
    let txt = req.query.txt || undefined;
    let page = req.query.page || 1;
    let type = req.query.type;
    let perPage = req.query.perPage || 8;
    try {
        let allProduct = await productModel.find({
            type: type,
            $or: [{ productName: txt }, { descriptionProduct: txt }],
        }).skip((page - 1) * perPage).limit(perPage);
        res.json(allProduct)
    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }
}
export const getProductById = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ type: "error", messege: "invalid code" })
        }
        // return res.status(400).json({ type: "not valid id", message: "id not in right format" })
        let product = await productModel.findById(id);
        if (!product)
            return res.status(404).json({ type: "no id", message: "no product with such id" })
        return res.json(product)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }

}


export const deleteProduct = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })

        let product = await productModel.findByIdAndDelete(id);
        if (!product)
            return res.status(404).json({ type: "no product to delete", message: "no product with such id to delete" })

        return res.json(product)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }

}


export const addProduct = async (req, res) => {
    let { _id, src, productName, descriptionProduct, manufacturingDateProduct, pictureRoutingProduct, domainProduct, type,price } = req.body;

    if (!productName)
        return res.status(404).json({ type: "missing params", message: "missing details: id or productName or supplierId" })

    const errors = await productValidator(req.body);
    console.log(errors)
    try {

        let sameProduct = await productModel.findOne({ _id: _id });
        if (sameProduct)
            return res.status(409).json({ type: "same details", message: "there is already same product" })
        let newProduct = new productModel({ userId: req.user._id, productName, src, descriptionProduct, manufacturingDateProduct, pictureRoutingProduct, domainProduct,price,type });
        await newProduct.save();
        return res.json(newProduct)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }

}


export const updateProduct = async (req, res) => {

    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: "id not in right format" })
    try {
        let product = await productModel.findById(id);
        if (!product)
            return res.status(404).json({ type: "product not found", message: "no product with such id" })
        if (req.user.role != "ADMIN")
            req.status(403).json({ type: "you are not alowd", massage: "you are not alowd to add a product" })
        let updated = await productModel.findByIdAndUpdate(id, req.body, { new: true })
        return res.json(updated);

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get product" })
    }

}