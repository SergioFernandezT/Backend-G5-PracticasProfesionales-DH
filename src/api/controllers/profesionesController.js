const { Profesion } = require("../../database/models");

const controller = {

    // Listar todas las profesiones
    getProfesiones: async (req, res) => {
        try {
            const profesiones = await Profesion.findAll();
            res.json(profesiones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener una profesión por ID
    getProfesion: async (req, res) => {
        try {
            const profesion = await Profesion.findByPk(req.params.id);
            if (profesion) {
                res.json(profesion);
            } else {
                res.status(404).json({ error: 'Profesión no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear una nueva profesión
    createProfesion: async (req, res) => {
        try {
            const profesion = await Profesion.create(req.body);
            res.status(201).json(profesion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar una profesión por ID
    updateProfesion: async (req, res) => {
        try {
            const [updated] = await Profesion.update(req.body, { where: { id: req.params.id } });
            if (updated) {
                const updatedProfesion = await Profesion.findByPk(req.params.id);
                res.status(200).json(updatedProfesion);
            } else {
                res.status(404).json({ error: 'Profesión no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar una profesión por ID
    deleteProfesion: async (req, res) => {
        try {
            const deleted = await Profesion.destroy({ where: { id: req.params.id } });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Profesión no encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = controller;



