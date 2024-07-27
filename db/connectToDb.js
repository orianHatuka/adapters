import sql from 'msnodesqlv8';
import { config as loadEnv } from 'dotenv';

// טעינת משתני סביבה מקובץ .env
loadEnv();
//DESKTOP-A7914CV\SQLEXPRESS
const connectionString = "Server=DESKTOP-A7914CV\SQLEXPRESS;Database=Practicum;Trusted_Connection=Yes;Provider=MSOLEDBSQL";
export async function connectToDB() {
    return new Promise((resolve, reject) => {
        console.log('Attempting to connect to the database...');
        sql.open(connectionString, (err, conn) => {
            if (err) {
                console.error('Error connecting to the database:', err.message);
                reject(err);
            } else {
                console.log('Connected to the database successfully');
                resolve(conn);
            }
        });
    });
}

export async function closeConnection(conn) {
    return new Promise((resolve, reject) => {
        conn.close((closeErr) => {
            if (closeErr) {
                console.error('Error disconnecting from the database:', closeErr.message);
                reject(closeErr);
            } else {
                console.log('Disconnected from the database');
                resolve();
            }
        });
    });
}
