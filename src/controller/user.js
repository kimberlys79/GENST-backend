const { hashPassword, comparePassword } = require('../utils/bcrypt');
const response = require('../../response');
const UserModel = require('../models/user');
const { generateToken } = require('../utils/jwt');

const getAllUser = async (req, res) => {
    try {
        const [data] = await UserModel.getAllUser();
        response(200, { allUser: data }, "Get All User Success", res);
    } catch (error) {
        console.error('GET ALL USER ERROR:', error);
        response(500, { error: error }, "Server Error", res);
    }
}

const getUserDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const [data] = await UserModel.getUserDetail(id);
        response(200, { userDetail: data }, 'GET User Detail Success', res);
    } catch (error) {
        console.error('GET USER DETAIL ERROR:', error);
        response(500, { error: error.message || error }, 'Server Error', res);
    }
}

const createNewUser = async (req, res) => {
    const body = req.body;

    console.log(body)

    if (!body.name || !body.badge_number|| !body.email || !body.password) {
        return response(400, { data: null }, "Incomplete Data", res);
    }
    
    try {
        const hashedPassword = await hashPassword(body.password)
        const newUser = {
            ...body,
            password: hashedPassword
        };

        console.log(newUser)

        await UserModel.createNewUser(newUser);

        response(201, {
            message: "CREATE New User Success",
            newUser: {
                name: newUser.name,
                badge_number: newUser.badge_number,
                email: newUser.email,
                password: newUser.password
            }
        }, null, res);

    } catch (error) {
        console.error('CREATE USER ERROR:', error);
        response(500, { error: error }, "Server Error", res);
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    console.log(id)
    console.log(req.params)
    try {
        await UserModel.updateUser(body, id);
        response(200, { updatedUser: body }, "UPDATE User Success", res);
    } catch (error) {
        response(500, { error: error }, "Server Error", res);
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await UserModel.deleteUser(id);
        response(200, { userId: id }, "Delete User Success", res);
    } catch (error) {
        console.error('DELETE USER ERROR:', error);
        response(500, { error: error }, "Server Error", res);
    }
};

const loginUser = async (req, res) => { 
    const { badge_number, email, password } = req.body; 
    console.log(badge_number, email, password)

    if (!badge_number || !email || !password) { 
        return response(400, { data: null }, "Incomplete Data", res); 
    }

    try { 
        const [user] = await UserModel.findUserByEmail(email); 

        if(!user || user.length === 0) {
            return response(401, {loginResult: null}, "Invalid Email", res)
        }

        const userLogin = user[0]
        console.log(userLogin)

         // VALIDASI PASSWORD (aktifkan jika comparePassword sudah OK)
        // const isPasswordValid = comparePassword(password, userLogin.password);
        // if (!isPasswordValid) {
        //     return response(401, { loginResult: null }, "Wrong Password", res);
        // }

        const token = generateToken({ id: userLogin.id, badge_number: userLogin.badge_number, email: userLogin.email, password: userLogin.password }); 

        return response(200, {loginResult: {id, token, badgeNumber, email}}, 'Login User Success', res) 
    } catch (error) { 
        console.error('LOGIN USER ERROR:', error);
        response(500, { error: error.message }, "Server Error", res); } 
    };
        
module.exports = {
    getAllUser,
    getUserDetail,
    createNewUser,
    updateUser,
    deleteUser,
    loginUser
};