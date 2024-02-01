import mongoose from "mongoose";
import { orderSchemaModel, orderValidator } from "../models/order.js"
export const getAllOrders = async (req, res, next) => {

    let txt = req.query.txt || undefined;
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 30;
    try {
        let allOrders = await orderSchemaModel.find({ }).skip((page - 1) * perPage).limit(perPage);
        res.json(allOrders)
    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }
}



export const getAllOrdersByUser = async (req, res, next) => {
    let ordererId = req.user._id;
    try {
        let allOrders = await orderSchemaModel.find({ordererId})
        return res.json(allOrders)

    }
    catch (err) {
         res.status(400).json({ type: "invalid operation", message: "sorry cannot get orders" })
    }
}


export const deleteOrder = async (req, res) => {
    let { id , onWayProduct} = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })
       
        if (onWayProduct == "true")
            req.status(403).json({ type: "order on way", massage: "your order is on the way" })
        let order = await orderSchemaModel.findByIdAndDelete(id);
        if (!order)
            return res.status(404).json({ type: "no order to delete", message: "no order with such id to delete" })

        return res.json(order)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }

}

export const addOrder = async (req, res) => {
    let { orderDate, DueDate, orderAddress, product, orderId, onWayProduct } = req.body;

    if (!orderAddress)
        return res.status(404).json({ type: "missing params", message: "missing details: address or product" })

    const errors = await orderValidator(req.body);
    console.log(errors)
    try {
        // if (req.orederId != req.user._id)
        //     req.status(403).json({ type: "you are not alowd", massage: "you are not alowd to add a order" })
        let newOrder = new orderSchemaModel({ orderDate, DueDate, orderAddress, product, orderId, onWayProduct });
        await newOrder.save();
        return res.json(newOrder)

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }

}


export const updateOrder = async (req, res) => {

    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: "id not in right format" })
    try {
        let order = await orderSchemaModel.findById(id);
        if (!order)
            return res.status(404).json({ type: "order not found", message: "no order with such id" })

        let updated = await orderSchemaModel.findByIdAndUpdate( id , {onWayProduct: true} )

        return res.json(updated, onWayProduct);

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get order" })
    }

}