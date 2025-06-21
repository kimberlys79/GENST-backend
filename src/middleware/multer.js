const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan folder ada
const pdfDir = 'public/uploads/pdf/';
const imageDir = 'public/uploads/images/';
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

// Dynamic storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'report_pdf') {
            cb(null, pdfDir);
        } else if (file.fieldname === 'upload_photo' || file.fieldname === 'inspector_sign') {
            cb(null, imageDir);
        } else {
            cb(new Error('Unsupported fieldname: ' + file.fieldname), false);
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFields = ['upload_photo', 'inspector_sign', 'report_pdf'];

    if (allowedFields.includes(file.fieldname)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file field: ' + file.fieldname), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
