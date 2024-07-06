const { Profesiones } = require("../../database/models");

const controller = {

    getProfesiones: async (req, res) => {
        const profesiones = await Profesiones.findAll();
        res.json(profesiones);
    },

    getProfesion: async (req, res) => {
        const profesion = await Profesiones.findByPk(req.params.id);
        res.json(profesion);
    },

    createProfesion: async (req, res) => {
        const profesion = await Profesiones.create(req.body);
        res.json(profesion);
    },

    updateProfesion: async (req, res) => {
        const profesion = await Profesiones.update(req.body, { where: { id: req.params.id } });
        res.json(profesion);
    },

}

module.exports = controller;