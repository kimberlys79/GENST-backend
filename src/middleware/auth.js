const { verifyToken } = require('../utils/jwt');
const userModel = require('../models/user');
const response = require('../../response');

const authentication = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return response(401, null, 'Bearer Token Not Provided', res);
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        const [userRows] = await userModel.authentication(decoded.email);
        if (userRows.length === 0) {
            console.log(decoded)
            console.log(decoded.email)
            console.log([userRows])
            return response(401, null, 'User Not Found', res);
        }

        req.userData = { id: userRows[0].id, username: userRows[0].username };
        next();
    } catch (error) {
        response(500, null, 'Internal Server Error', res);
    }
};

const authorization = async (req, res, next) => {
    try {
        const [userRows] = await userModel.getUserDetail(req.userData.id);
        if (userRows.length === 0) {
            return response(403, null, 'Access Denied', res);
        }

        next();
    } catch (error) {
        response(500, null, 'Internal Server Error', res);
    }
};

module.exports = { authentication, authorization };
