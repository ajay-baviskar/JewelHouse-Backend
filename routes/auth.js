const express = require('express');
const router = express.Router();
const { register, login,loginAdmin, getAllUsers,forgotPassword, editUser, updatePassword } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/login-admin', loginAdmin);

router.get('/users', getAllUsers);
router.post('/forgot-password', forgotPassword);

router.put('/users/:id', editUser);

router.put('/users/:id/password', updatePassword);



module.exports = router;
