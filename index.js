import express  from "express";
import productRouter from "./routes/product.js"
import userRouter from "./routes/user.js"
import { connectToDB } from "./db/connectToDb.js"
import { config } from "dotenv";
import cors from "cors";
import {errorHandling} from "./middleware/errorHanding.js"
import orderRouter from "./routes/order.js"

const app = express();
app.use(cors())
app.use(express.json());
connectToDB();
config();
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use(errorHandling)
app.use(express.static("image"));
let port = process.env.PORT || 3500;
app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})
