import sql from 'msnodesqlv8';

// הגדרת מחרוזת החיבור
const connectionString = "server=MYCOMP;Database=praktikum;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

// פונקציה לפתיחת חיבור למסד הנתונים
export function connectToDB() {
    return new Promise((resolve, reject) => {
        sql.open(connectionString, (err, conn) => {
            if (err) {
                console.log(err)
                reject(err);
            }
            else resolve(conn);
        });
    });
}

// פונקציה לסגירת החיבור למסד הנתונים
export function closeConnection(conn) {
    return new Promise((resolve, reject) => {
        conn.close((err) => {
            if (err) {
                reject(err);
                console.log(err)
            }
            else resolve();
        });
    });
}
