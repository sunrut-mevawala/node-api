const express = require('express');
const router = express.Router();
const userAuth = require ('../controller/userAuth.controller');

router.post('/userLogin',userAuth.userLogin);
router.post('/userRegistration',userAuth.userRegistration);

module.exports = router;