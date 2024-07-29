const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../middleware/authMiddleware'); // Importación corregida
const aspiranteController = require('../controllers/aspirantesController');

// Rutas para los aspirantes

// GET - Listar todos los aspirantes (protegido con token)
router.get('/', aspiranteController.getAspirantes);

// GET - Obtener un aspirante por id (protegido con token)
router.get('/detail/:id', aspiranteController.getAspirante);

// POST - Crear un nuevo aspirante (público, no necesita token)
router.post('/create', aspiranteController.createAspirante);

// PUT - Actualizar un aspirante por id (protegido con token)
router.put('/edit/:id', authenticateToken, aspiranteController.updateAspirante);

// DELETE - Eliminar un aspirante por id (protegido con token)
router.delete('/delete/:id', authenticateToken, aspiranteController.deleteAspirante);

// GET - Obtener aspirantes según descripción (protegido con token)
router.get('/search/:keywords', aspiranteController.searchAspirantes);

// GET - Obtener aspirantes según nombre
router.get('/name/:name', aspiranteController.searchAspirantesByName);

// Rutas para registro e inicio de sesión
router.post('/register', aspiranteController.register); // No necesita token
router.post('/login', aspiranteController.login); // No necesita token

// GET - Obtener la cantidad de aspirantes por profesión
router.get('/aspirantes-por-profesion', aspiranteController.getAspirantesPorProfesion);

module.exports = router;
