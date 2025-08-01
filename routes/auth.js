const express = require('express');
const router = express.Router();
const { register, login,loginAdmin, getAllUsers } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/login-admin', loginAdmin);

router.get('/users', getAllUsers);

module.exports = router;
