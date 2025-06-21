const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'report_pdf') {
            cb(null, 'public/uploads/pdf');  // simpan PDF di sini
        } else {
            cb(null, 'public/images');       // image tetap di sini
        }
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const originalname = file.originalname;
        cb(null, `${timestamp}-${originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 15 * 1000 * 1000 //15MB
    }
});

module.exports =upload;