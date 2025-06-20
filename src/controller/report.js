const express = require('express'); 
const router = express.Router();
const reportModel = require('../models/report'); 
const response = require('../../response'); 

const getAllReport = async (req, res) => {
    try {
        const [data] = await reportModel.getAllReport();
        response(200, { report: data }, 'GET All Report Success', res);
        if ([data] == null) {
            response(404, {error: "Report Not Found"}, res)
        }
    } catch (error) {
        response(500, { error: error }, 'Server Error', res);
        throw error;
    }
};

const getReportDetail = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [data] = await reportModel.getReportDetail(id); 
        response(200, { reportDetail: data }, 'GET Report Detail Success', res);
    } catch (error) {
        response(500, { error: error }, 'Server Error', res);
        throw error;
    }
};

const createNewReport = async (req, res) => {
    const body = req.body;
    const files = req.files;

    if (files?.upload_photo?.[0]) {
        body.upload_photo = files.upload_photo[0].filename
    }

    if (files?.inspector_sign?.[0]) {
        body.inspector_sign = files.inspector_sign[0].filename
    }

    if (files?.report_pdf?.[0]) {
    body.report_pdf = files.report_pdf[0].filename
    }

    console.log('Final Request Body: ', body);

    try {
        await reportModel.createNewReport(body);
        response(201, { newReport: body }, 'CREATE Report Success', res);
    } catch (error) {
        console.error('Error:', error.message);
        response(500, { error: error.message }, 'Server Error', res);
        throw error;
    }
};

const reportController = {
    getAllReport,
    getReportDetail,
    createNewReport,
};

module.exports = reportController; 