const generatorModel = require('../models/generator');
const response = require('../../response');

const getAllGenerator = async (req,res) => {
    try {
        const [data] = await generatorModel.getAllGenerator();
        response(200, {generator: data}, 'Get Generator Success', res);
    } catch (error) {
        response(500, {error: error}, 'Server Error', res)
        throw error
    }
}

const createNewGenerator = async (req, res) => {
    const body = req.body;
    console.log("Request Body Received:", req.body);

    try {
        await generatorModel.createNewGenerator(body);
        response(201, { newGenerator: req.body }, 'CREATE  New Generator Success', res);
    } catch (error) {
        console.error("Error:", error.message);
        response(500, {error: error.message}, 'Server Error', res);
        throw error;
    }
};

const getGeneratorDetail = async(req, res) => {
    const { id } = req.params

    try {
        const [data] = await generatorModel.getGeneratorDetail(id)
        response(200, {generatorDetail: data}, 'GET Generator Detail Success', res);
    } catch (error) {
        response(500, {error, error}, 'Server Error', res)
        throw error
    }
}

const updateGenerator = async (req, res) => {
    console.log("Request Body: ", req.body);
    const body = req.body;
    const { id } = req.params; 
    //console.log("Body Received:", body);
    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({ message: "Request body cannot be empty" });
    }
    
    try {
        await generatorModel.updateGenerator(body, id);
        response(200, { updatedGenerator: body }, "UPDATE Generator Success", res);
    } catch (error) {
        console.error("Error Details: ", error);
        response(500, { error: error }, "Server Error", res);
    }
};

module.exports = {
    getAllGenerator,
    getGeneratorDetail,
    createNewGenerator,
    updateGenerator
}