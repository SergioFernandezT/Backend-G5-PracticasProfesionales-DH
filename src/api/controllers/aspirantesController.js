const { Aspirante } = require('../../database/models/');

const controller = {
    getAspirantes: async(req, res) =>{
        const aspirantes = await Aspirante.findAll();
        res.json(aspirantes);
    },
    getAspirante: async(req, res) => {
        const id = req.params.id;
        const aspirante = await Aspirante.findByPk(id);
        res.json(aspirante);
    },
    createAspirante: async(req, res) => {
            const aspirante = await Aspirante.create(req.body);
            res.json(aspirante);

    },
    updateAspirante: async (req, res) => {
        try {
            const [updated] = await Aspirante.update(req.body, {
                where: {
                    id: req.params.id
                },
                individualHooks: true  // This ensures that the hooks defined in the model are executed
            });
            if (updated) {
                const updatedAspirante = await Aspirante.findByPk(req.params.id);
                res.status(200).json(updatedAspirante);
            } else {
                res.status(404).json({ message: 'Aspirante no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el aspirante', error });
        }
    },
    deleteAspirante: async(req, res) => {
        Aspirante.destroy({
            where: {
                id: req.params.id
            }
        })
    }
}

module.exports = controller;