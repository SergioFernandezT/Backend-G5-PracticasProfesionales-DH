const express = require('express');
const router = express.Router();

const profesionController = require('../controllers/profesionesController');

// Rutas para las profesiones

// GET - Listar todas las profesiones
router.get('/', profesionController.getProfesiones);

// GET - Obtener una profesión por id
router.get('/:id', profesionController.getProfesion);

// POST - Crear una nueva profesión
router.post('/create', profesionController.createProfesion);

// PUT - Actualizar una profesión por id
router.put('/edit/:id', profesionController.updateProfesion);

// DELETE - Eliminar una profesión por id
router.delete('/delete/:id', profesionController.deleteProfesion);

module.exports = router;


