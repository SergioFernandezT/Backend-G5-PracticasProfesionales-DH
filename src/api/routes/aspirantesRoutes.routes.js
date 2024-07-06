// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const aspirantesController = require('../controllers/aspirantesController');

/*** GET ALL ASPIRANTES ***/
router.get('/', aspirantesController.getAspirantes);

module.exports = router;