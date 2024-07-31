const stockSystemAdapter=require("./stockSystemAdapter")
const fs = require('fs').promises;
const config=require("./stocksName.json");
const { JSON } = require("express");

class StockSystemFromDummyServerAdapter extends stockSystemAdapter{
    constructor() {
        super();
    }
    async fetchStockName() {
        try {
            let route = config.stockSystemAdapter.stockName;
            let data = await fs.readFile(route, 'utf-8');
            return JSON.parse(data); // אם הקובץ מכיל JSON, אחרת תתאים את הפרסינג בהתאם לפורמט הקובץ
        } catch (error) {
            console.error('Error reading the file:', error);
            throw error; // אם תרצה לזרוק את השגיאה למעלה לטיפול חיצוני
        }
    }
    async get(stockName){
        try {
            let route = config.stockSystemAdapter.routeForGet;
            let data = await fs.readFile(route, 'utf-8');
            data= JSON.parse(data); // אם הקובץ מכיל JSON, אחרת תתאים את הפרסינג בהתאם לפורמט הקובץ
            let stockName2= data.find(item=>item.stockName=stockName);      
                 return stockName2;
            
        } catch (error) {
            console.error('Error reading the file:', error);
            throw error; // אם תרצה לזרוק את השגיאה למעלה לטיפול חיצוני
        }
    }
 }
 module.exports=StockSystemFromDummyServerAdapter