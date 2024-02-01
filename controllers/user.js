import { generateToken, userModel } from "../models/user.js";
import bcrypt from "bcryptjs";
export const addUser = async (req, res) => {
    let { userName, password, email } = req.body;

    if (!userName || !password || !email)
        return res.status(404).json({ type: "missing parameters", message: "Please enter email, user name and password" })
    try {
        const sameUser = await userModel.findOne({ email: email });
        if (sameUser)
            return res.status(409).json({ type: "same user", message: "Used already exists in the system" })
        let hashedPassword = await bcrypt.hash(password, 15);
        let newUser = new userModel({ email, password: hashedPassword, userName, role : "user" });
        await newUser.save();
        let token = generateToken(newUser._id, newUser.role, newUser.userName)
        res.json({_id : newUser.id , userName : newUser.userName, token, email : newUser.email})
    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "Cannot add this user" })
    }
}


export const login = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password)
        return res.status(404).json({ type: "missing parameters", message: "Please enter email and password" })
    try {
        const user = await userModel.findOne({ email: email });
        if (!user)
            return res.status(404).json({ type: "User not found", message: "One or more details are invalid" })
        if (! await bcrypt.compare(password, user.password))
            return res.status(404).json({ type: "User not found", message: "User password is invalid" })
        user.password = "****";
        let token = generateToken(user._id, user.role, user.userName);
        return res.json({_id: user.id, userName: user.userName, token, email : user.email})
    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "Unable to enter user" })
    }
}

export const getAllUsers = async (req, res) => {

    try {
        if (req.user.role != "ADMIN")
            req.status(403).json({ type: "you are not alowd", massage: "you are not alowd to add a user" })
        let allUsers = await userModel.find({}, "-password");
        res.json(allUsers);

    } catch (err) {
        res.status(400).json({ type: "invalid operation", message: "Unable to enter user" })
    }
}