const express = require('express');
const usersController = require('../controllers/usersController');
const router = express.Router();

router.get('/login', usersController.login);
router.get('/register', usersController.register);

router.post('/create', usersController.addRegister);

module.exports = router;