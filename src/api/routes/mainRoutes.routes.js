// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const mainController = require('./api/controllers/mainController');

router.get('/', mainController.index);
//router.get('/search', mainController.search); 

module.exports = router;
