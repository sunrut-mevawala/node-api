const express = require('express');
const userController = require('../controller/user.controller'); 
const router = express.Router();

router.post('/insertUser',userController.inserUser);

module.exports = router;