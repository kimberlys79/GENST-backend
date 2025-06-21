const multer = require('multer');
const path = require('path');

// Storage untuk image (photo & sign)
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/images/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

// Storage untuk PDF
const pdfStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/pdf/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'upload_photo' || file.fieldname === 'inspector_sign') {
        cb(null, true);
    } else if (file.fieldname === 'report_pdf') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file'), false);
    }
};

const upload = multer({
    storage: function (req, file, cb) {
        if (file.fieldname === 'report_pdf') {
            cb(null, pdfStorage);
        } else {
            cb(null, imageStorage);
        }
    },
    fileFilter: fileFilter
});

module.exports =upload;