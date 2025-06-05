const dbPool = require('../config/database')

const getAllGenerator = () => {
    const sqlQuery = 'SELECT * FROM  generator';

    return dbPool.execute(sqlQuery);
};

const getGeneratorDetail = (idGenerator) => {
    const sqlQuery = `SELECT * FROM generator WHERE generator_id = '${idGenerator}'`;

    return dbPool.execute(sqlQuery, [idGenerator]);
};

const createNewGenerator = (body) => {
    const sqlQuery = `INSERT INTO generator (generator_code, generator_name, power) 
                        VALUES ('${body.generator_code}', '${body.generator_name}', '${body.power}')`;

    const values = [ body.generator_code, body.generator_name, body.power ]; 
    
    console.log('Values:', values);

    return dbPool.execute(sqlQuery, [body.generator_code, body.generator_name, body.power]);                        
};

const updateGenerator = (body, id) => {

    const fields = Object.keys(body).map(key => `${key}='${body[key]}'`).join(', ')
    const values = Object.values(body);
    const sqlQuery = `UPDATE generator SET ${fields} WHERE generator_id = '${id}' `; 
    //console.log("Executing Query: ", sqlQuery);
    return dbPool.execute(sqlQuery, [...values, id]);
};

const deleteGenerator = (idGenerator) => {
    const sqlQuery = `DELETE FROM generator WHERE generator_id=${idGenerator}`;

    return dbPool.execute(sqlQuery, [idGenerator]);
};

module.exports = {
    getAllGenerator,
    getGeneratorDetail,
    createNewGenerator,
    updateGenerator,
    deleteGenerator
}