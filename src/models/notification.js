const dbPool = require('../config/database');

const getAllNotification = () => {
    const sqlQuery = 'SELECT * FROM notification'

    return dbPool.execute(sqlQuery)
}

const getNotificationDetail = (idNotification) => {
    const sqlQuery = ` SELECT * FROM notification WHERE notification_id = ?`
    
    return dbPool.execute(sqlQuery, [idNotification])
}

const createNewNotification = (body) => {
    const sqlQuery = `INSERT INTO notification (title, message) VALUES (?, ?)`;
    return dbPool.execute(sqlQuery, [body.title, body.message]);
};


const deleteNotification = (idNotification) => {
    const SQLQuery = `DELETE FROM notification WHERE notification_id=${idNotification}`;

    return dbPool.execute(SQLQuery, [idNotification]);
};

module.exports = {
    getAllNotification, 
    getNotificationDetail,
    createNewNotification,
    deleteNotification
};