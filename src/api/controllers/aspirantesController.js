const { Aspirante } = require("../../database/models");

const controller = {
    getAspirantes: async (req, res) => {
        const aspirantes = await Aspirante.findAll();
        res.json(aspirantes);
    },
    getAspirante: async (req, res) => {
        const { id } = req.params;
        const aspirante = await Aspirante.findByPk(id);
        res.json(aspirante);
    },
    createAspirante: async (req, res) => {
        const aspirante = await Aspirante.create(req.body);
        res.json(aspirante);
    },
    updateAspirante: async (req, res) => {
        const { id } = req.params;
        const aspirante = await Aspirante.update(req.body, { where: { id } });
        res.json(aspirante);
    },

}

module.exports = controller;