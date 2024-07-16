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
    updateAspirante: async(req, res) => {
        const aspirante = await  Aspirante.update(req.body,
            {
            where: {
                id: req.params.id
            }
        })
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