const mysql = required('mysql2');

const dbPool =mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = dbPool.promise();