const express = require('express');

const router = express.Router();
const authController = require('./../controllers/autController');


router.post('/signup', authController.signup);


module.exports = router;
