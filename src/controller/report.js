const reportModel = require('../models/report'); 
const response = require('../../response'); 
const fs = require('fs');
const path = require('path');

const getAllReport = async (req, res) => {
    try {
        const [data] = await reportModel.getAllReport();

        if ([data] == null) {
            response(404, {error: "Report Not Found"}, res)
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        
        const reportsWithUrl = data.map(report => {
            return {
                ...report,
                report_pdf_url: report.report_pdf 
                    ? `${baseUrl}/uploads/pdf/${report.report_pdf}`
                    : null
            };
        });

        response(200, { report: reportsWithUrl }, 'GET All Report Success', res);
    } catch (error) {
        response(500, { error: error }, 'Server Error', res);
        throw error;
    }
};

const getPdfBuffer = (filename) => {
    if (!filename) return null;

    const pdfPath = path.join(__dirname, '../../public/uploads/pdf', filename);


    if (fs.existsSync(pdfPath)) {
        const buffer = fs.readFileSync(pdfPath);
        return {
            type: 'Buffer',
            data: Array.from(buffer)
        };
    } else {
        console.warn(`PDF not found: ${pdfPath}`);
        return null;
    }
};

const getReportDetail = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [data] = await reportModel.getReportDetail(id);

        if (!data || data.length === 0) {
            return response(404, { error: "Report Not Found" }, 'Data not found', res);
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const reportDetail = {
            ...data[0],
            report_pdf_url: data[0].report_pdf
                ? `${baseUrl}/uploads/pdf/${data[0].report_pdf}`
                : null
        };
        
        response(200, { reportDetail: reportDetail  }, 'GET Report Detail Success', res);
    } catch (error) {
        response(500, { error: error }, 'Server Error', res);
        throw error;
    }
}

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