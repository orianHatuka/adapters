import sql from 'msnodesqlv8';
import { config as loadEnv } from 'dotenv';

loadEnv();

const connectionString = "Server=MYCOMP;Database=praktikum;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

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
