import express from "express";
import userRouter from "./routes/user.js";
import { connectToDB } from "./db/connectToDb.js";
import { config } from "dotenv";
import cors from "cors";
import { errorHandling } from "./middleware/errorHanding.js";

// טעינת משתני סביבה מקובץ .env
config();

const app = express();
app.use(cors());
app.use(express.json());

// התחברות לבסיס הנתונים
connectToDB().then((conn) => {
    // התחברות מוצלחת, נמשיך להגדיר את השרת ולהאזין לבקשות
    app.use("/api/user", userRouter);
    app.use(errorHandling);
    app.use(express.static("image"));

    let port = process.env.PORT || 3500;
    app.listen(port, () => {
        console.log(`app is listening on port ${port}`);
    });

    // דוגמה לשימוש בחיבור שנוצר
    // כאן אפשר להוסיף קוד שמשתמש בחיבור למסד הנתונים

}).catch((err) => {
    console.error('Failed to connect to the database. Server is not started.', err);
});
