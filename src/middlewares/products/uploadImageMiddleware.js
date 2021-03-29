const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../../public/images/products'));
    },
    filename: (req, file, cb) => {
        const newFilename = file.fieldname + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

const fileFilter = (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const acceptedExtensions = ['.jpg', '.png', '.gif', '.webp'];

    if(!acceptedExtensions.includes(fileExtension)) {
        return cb(null, false);
    }
    return cb(null, true);
}

const upload = multer({ storage, fileFilter });

module.exports = upload;