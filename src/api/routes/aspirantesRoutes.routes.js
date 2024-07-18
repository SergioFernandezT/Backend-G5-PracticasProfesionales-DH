const express = require('express')
const router = express.Router();

const aspiranteController = require('../controllers/aspirantesController');

// Rutas para los aspirantes

// GET - Listar todos los aspirantes
router.get('/', aspiranteController.getAspirantes);

// GET - Obtener un aspirante por id
router.get('/detail/:id', aspiranteController.getAspirante);

// POST - Crear un nuevo aspirante
router.post('/create', aspiranteController.createAspirante);

// PUT - Actualizar un aspirante por id
router.put('/edit/:id', aspiranteController.updateAspirante);

// DELETE - Eliminar un aspirante por id
router.delete('/delete/:id', aspiranteController.deleteAspirante);

// GET - Obtener aspirantes segun descripcion
router.get('/search/:keywords', aspiranteController.searchAspirantes);

module.exports = router;