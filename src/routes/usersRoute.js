const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');

const upload = require('../middlewares/users/multerMiddleware');
const registerValidations = require('../middlewares/users/validateRegisterMiddleware');
const loginValidations = require('../middlewares/users/validateLoginMiddleware');
const authMiddleware = require('../middlewares/users/authMiddleware');
const guestMiddleware = require('../middlewares/users/guestMiddleware');

router.get('/login', guestMiddleware, usersController.login);
router.get('/logout', usersController.logout);
router.get('/profile', authMiddleware, usersController.profile);
router.post('/login', loginValidations, usersController.loginProcess);
router.get('/register', guestMiddleware, usersController.register);
router.post('/create', upload.single('profileImage'), registerValidations, usersController.processRegister);

module.exports = router;