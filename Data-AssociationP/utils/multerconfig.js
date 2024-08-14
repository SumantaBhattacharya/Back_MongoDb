const multer = require("multer");
const crypto = require("crypto");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads'); // Updated to use a directory, not a specific file
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(12, (err, bytes) => {
            const fn = bytes.toString("hex") + path.extname(file.originalname);
            cb(null, fn);
        });
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

/*
filename: function (req, file, cb) {
        const filename = crypto.randomBytes(12).toString('hex') + path.extname(file.originalname);
        cb(null, filename);
    }

cloudinary
express file upload
multer

*/