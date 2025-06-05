const dbPool = require('../config/database');

const getAllUser = () => {
    const SQLQuery = 'SELECT *FROM user';
    
    return dbPool.execute(SQLQuery)
}

const getUserDetail = (idUser) => {
    const sqlQuery = ` SELECT * FROM user WHERE user_id='${idUser}'`
    
    return dbPool.execute(sqlQuery)
}

const createNewUser = (body) => {
    const SQLQuery = `INSERT INTO user (name, badge_number, email, password) 
    VALUES ('${body.name}', '${badge_number}', '${body.email}', '${body.password}')`

    return dbPool.execute(SQLQuery);                    
}


const updateUser = (body, id) => {
    const fields = Object.keys(body).map(key => `${key}='${body[key]}'`).join(', ')
    const SQLQuery = `UPDATE user SET ${fields} WHERE user_id= ${id} `;
    return dbPool.execute(SQLQuery);                    
}

const deleteUser = (id) => {
    const SQLQuery = `DELETE FROM user WHERE user_id=${id}`;

    return dbPool.execute(SQLQuery);
}

const authentication = (email) => {
    const sqlQuery = `SELECT * FROM user WHERE email = '${email}'`

    return dbPool.execute(sqlQuery)
}

const findUserByEmail = async(email) => { 
    const query = `SELECT * FROM user WHERE email = '${email}'`;
    
    return dbPool.execute(query); 
};

module.exports = {
    getAllUser,
    getUserDetail,
    createNewUser,
    updateUser,
    deleteUser,
    authentication,
    findUserByEmail
}