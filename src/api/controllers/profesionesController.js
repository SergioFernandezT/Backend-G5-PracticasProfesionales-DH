const { Profesion } = require('../../database/models');

const profesionesController = {
    // Listar todas las profesiones
    getAll: async (req, res) => {
        try {
            const profesiones = await Profesion.findAll();
            res.json(profesiones);
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Crear una nueva profesión
    create: async (req, res) => {
        const { profesion } = req.body;
        try {
            await Profesion.create({ profesion });
            res.status(201).send('Profesión creada');
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Eliminar una profesión por ID
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            await Profesion.destroy({ where: { id } });
            res.send('Profesión eliminada');
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Modificar una profesión por ID
    update: async (req, res) => {
        const { id } = req.params;
        const { profesion } = req.body;
        try {
            await Profesion.update({ profesion }, { where: { id } });
            res.send('Profesión modificada');
        } catch (err) {
            res.status(500).send(err);
        }
    },

    // Buscar una profesión por ID
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const profesion = await Profesion.findByPk(id);
            if (profesion) {
                res.json(profesion);
            } else {
                res.status(404).send('Profesión no encontrada');
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
};

module.exports = profesionesController;


