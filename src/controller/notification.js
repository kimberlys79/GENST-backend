const notificationModel = require('../models/notification');
const response = require('../../response');

const getAllNotification = async (req,res) => {
    try {
        const [data] = await notificationModel.getAllNotification()
        response(200, {notification: data}, 'Get Notification Success', res)
    } catch (error) {
        response(500, {error: error}, 'Server Error', res)
        throw error
    }
}

const createNewNotification = async (req, res) => {
    const { body } = req;

    try {
        await notificationModel.createNewNotification(body);
        response(201, { newNotification: body }, 'CREATE Notification Success', res);
    } catch (error) {
        response(500, { error: error }, 'Server Error', res);
        throw error;
    }
};

const getNotificationDetail = async(req, res) => {
    const { id } = req.params;

    try {
        const [data] = await notificationModel.getNotificationDetail(id)
        response(200, {notificationDetail: data}, 'GET Notification Detail Success', res)
    } catch (error) {
        response(500, {error, error}, 'Server Error', res)
        throw error
    }
}

const deleteNotification= async (req, res) => {
    const { id } = req.params;

    try {
        const [data] = await notificationModel.deleteNotification(id);
        response(200, { notificationId: id }, 'DELETE Notification Success', res); 
    } catch (error) {
        response(500, { error: error }, 'Server Error', res);
        throw error;
    }
};

const notificationController = {
    getAllNotification,
    getNotificationDetail,
    createNewNotification,
    deleteNotification
};

module.exports = notificationController; 