const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post('/insertUser', userController.inserUser); 
router.put('/updateUser/:id', userController.updateUser);
router.delete('/deleteUser/:id', userController.deleteUser);
router.get('/getAllUsers', userController.getAllUser);

module.exports = router;
