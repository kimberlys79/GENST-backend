const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan folder ada
const pdfDir = 'public/uploads/pdf/';
const imageDir = 'public/uploads/images/';
if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir, { recursive: true });
if (!fs.existsSync(imageDir)) fs.mkdirSync(imageDir, { recursive: true });

// Storage untuk image
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imageDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

// Storage untuk PDF
const pdfStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pdfDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedImage = ['upload_photo', 'inspector_sign'];
    const allowedPdf = ['report_pdf'];

    if (allowedImage.includes(file.fieldname) || allowedPdf.includes(file.fieldname)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file'), false);
    }
};

// Buat dua multer
const uploadImage = multer({ storage: imageStorage, fileFilter });
const uploadPdf = multer({ storage: pdfStorage, fileFilter });

// Gabungkan
const upload = multer();
upload.fieldsUpload = [
    { name: 'upload_photo', maxCount: 1 },
    { name: 'inspector_sign', maxCount: 1 },
    { name: 'report_pdf', maxCount: 1 }
];

upload.middleware = [
    uploadImage.fields([
        { name: 'upload_photo', maxCount: 1 },
        { name: 'inspector_sign', maxCount: 1 }
    ]),
    uploadPdf.fields([{ name: 'report_pdf', maxCount: 1 }])
];

module.exports = upload;
