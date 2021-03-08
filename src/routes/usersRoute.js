const express = require('express');
const multer = require('multer');
const path = require('path');
const usersController = require('../controllers/usersController');
const registerValidations = require('../middlewares/users/validateRegisterMiddleware');
const loginValidations = require('../middlewares/users/validateLoginMiddleware');
const authMiddleware = require('../middlewares/users/authMiddleware');

const router = express.Router();

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = path.resolve(__dirname, '../../public/images/users');
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        const newFilename = file.fieldname + Date.now() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

let upload = multer({ storage });

router.get('/login', usersController.login);
router.get('/logout', usersController.logout);
router.get('/profile', authMiddleware, usersController.profile);
router.post('/login', loginValidations, usersController.loginProcess);
router.get('/register', usersController.register);
router.post('/create', upload.single('profileImage'), registerValidations, usersController.processRegister);

module.exports = router;