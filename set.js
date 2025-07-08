const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUVvTnhVMDJ3aDFYSHl2TTVDcTZsRkVFYXRjSG5XYk1WRFRPcUozRklFaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiemM5RjBPdWw0RGdGUy9yOVU1a3orb2dNOGRpRmwwbkZ4dmphcmFVSVBTbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzQ1dBcVFlUTZZOWplMXJTZWwyY3ZhV3htTFRhejhhRmlNZGRreGdNUkZJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVZzkvSW9SLzBWSGZ1eXdUclRDYTdkWEJKc2M3KzNmdmFXUEhQWFFvNmhJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitKOEs0bk5QU1N5ME56RTFhTG9mZm9Ya3hnOEZ4M2UrbGs5QytoLzUvbU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNoOEdFaEYwZkRHVXNXVHIrVDZhWkVBTDIrRmVxbW9BT2R3b0dGS2tTblE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUxiaWdnem1qMS82MUpxS1VNVkpWSXk1QitzK001TGZQYk4vczlCdjdWbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGtjYWhpNDIybW8zaUt5OEhpZEQ4aTc1MDdrTU5WSEFtZURxbjFvK2VpND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNQc0FyVFZ3VzBZdS9JbW52RnJXNDZnZVV1bHk1RzFWc3BSTHljdk9WM2puZEkxVVV6SHdmRTdRNStGWnZsdUJhUTV2THV1OW5YTnRxNVp1c3dHU2pRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUzLCJhZHZTZWNyZXRLZXkiOiI0RUZiZDc3b2VKdmJSME9lZEtoWGVYUy9VeHJ3UjRQbktCVVhURlVWeDh3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NjcyNzA3MjQ2NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwQzY3RTg3QjlDNzJBRjZEMkYzNjIwODMwRTkzREJEMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyMDExMDgyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTY3MjcwNzI0NjZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNTk2QzU0MDZDNTA0Qzk5RDE0NDM1MzEzMzY2QkNGOTEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MjAxMTA4Nn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiUkxSWDJaQkYiLCJtZSI6eyJpZCI6IjI1NjcyNzA3MjQ2NjozQHMud2hhdHNhcHAubmV0IiwibGlkIjoiOTg4NDA2Njk2MzQ3NDI6M0BsaWQiLCJuYW1lIjoiTcWUIMWBw5jFhcOIxZTwn6SW8J+RvfCfkbsifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BLdHFNNEVFTFNpdHNNR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjY4VzlhaTZrUlpiWWNPQVozRUgyMTdxb2M0M2ZWWDNkMVlDMEtzV08wa009IiwiYWNjb3VudFNpZ25hdHVyZSI6InV0cnJFbFNPMkJSLytoemVXQVQvK0kwM2l0UlVNazd3dlR3S0VPUUw1WnNxcFNRRE1rc29aV3QxdXlxSFV0NUNlbmpvdUlIelJSSG1lZG14WStzVkF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpWEFzdit6Z0NxcTRYSXJVeWJzUHdQVExSa3BLZXZhRytkMGlHa1Q2MjZnM1Y3dzIwMkFKK2h4b0NXaDZ5dE9HeXYrWkZZK2VoWGkyVTFtT0hEZy9pUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NjcyNzA3MjQ2NjozQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmV2RnZXb3VwRVdXMkhEZ0dkeEI5dGU2cUhPTjMxVjkzZFdBdENyRmp0SkQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MjAxMTA3NCwibGFzdFByb3BIYXNoIjoiM2dQVUprIiwibXlBcHBTdGF0ZUtleUlkIjoiQUZnQUFLbTkifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Estaking 😈",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "256727072466",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

