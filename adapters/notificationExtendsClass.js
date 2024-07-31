const NotificationsSystemAdapter=require("./NotificationsSystemAdapter")
const fs = require('fs').promises;
const config=require("./notificationTypes.json");
const { JSON } = require("express");

class NotificationSystemFromDummyServerAdapter extends NotificationsSystemAdapter{
    constructor() {
        super();
    }
    async fetchNotificationsTypes() {
        try {
            let route = config.NotificationsSystemAdapter.notificationType;
            let data = await fs.readFile(route, 'utf-8');
            return JSON.parse(data); // אם הקובץ מכיל JSON, אחרת תתאים את הפרסינג בהתאם לפורמט הקובץ
        } catch (error) {
            console.error('Error reading the file:', error);
            throw error; // אם תרצה לזרוק את השגיאה למעלה לטיפול חיצוני
        }
    }
    async get(notificationType){
        try {
            let route = config.NotificationsSystemAdapter.routeForGet;
            let data = await fs.readFile(route, 'utf-8');
            data= JSON.parse(data); // אם הקובץ מכיל JSON, אחרת תתאים את הפרסינג בהתאם לפורמט הקובץ
            let notification= data.find(item=>item.notificationType=notificationType);      
                 return notification;
            
        } catch (error) {
            console.error('Error reading the file:', error);
            throw error; // אם תרצה לזרוק את השגיאה למעלה לטיפול חיצוני
        }

    }
    
 }
 module.exports=NotificationSystemFromDummyServerAdapter