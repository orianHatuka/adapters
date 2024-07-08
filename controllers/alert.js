import {  alertModel } from "../models/alert.js";
// import bcrypt from "bcryptjs";
export const addAlert = async (req, res) => {
    let { alertName, type } = req.body;
    try {
        let newAlert = new alertModel({  alertName, type});
        await newAlert.save();
        // let token = generateToken(newUser._id, newUser.role, newUser.userName)
        // res.json({ _id: newUser.id, userName: newUser.userName, token, email: newUser.email, role: newUser.role })
    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "Cannot add this alert" })
    }
}
export const deleteAlert = async (req, res) => {
    let { id } = req.params;
    try {
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "not valid id", message: "id not in right format" })

        let alert = await alertModel.findByIdAndDelete(id);
        if (!alert)
            return res.status(404).json({ type: "no alert to delete", message: "no alert with such id to delete" })

        return res.json(alert)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get alert" })
    }

}
export const updateAlert = async (req, res) => {

    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ type: "not valid id", message: "id not in right format" })
    try {
        let alert = await alertModel.findById(id);
        if (!alert)
            return res.status(404).json({ type: "alert not found", message: "no alert with such id" })
        
        let updated = await alertModel.findByIdAndUpdate(id, req.body, { new: true })
        return res.json(updated);

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ type: "invalid operation", message: "sorry cannot get alert" })
    }

}



