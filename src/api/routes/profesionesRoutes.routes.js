const express = require('express');
const router = express.Router();
const profesionesController = require('../controllers/profesionesController.js');

// Listar todas las profesiones
router.get('/', profesionesController.getAll);

// Crear una nueva profesión
router.post('/', profesionesController.create);

// Eliminar una profesión por ID
router.delete('/:id', profesionesController.delete);

// Modificar una profesión por ID
router.put('/:id', profesionesController.update);

// Buscar una profesión por ID
router.get('/:id', profesionesController.getById);

module.exports = router;

