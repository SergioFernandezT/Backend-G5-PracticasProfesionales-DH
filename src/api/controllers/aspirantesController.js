const { Aspirante } = require('../../database/models/');
const db = require("../../database/models/index");
const Op = db.Sequelize.Op;

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
    },
    searchAspirantes: async (req, res) => {
		try {
			let aspirantes = await Aspirante.findAll({
				where: {
					descripcion: { [Op.like]: `%${req.params.keywords}%` },
				},
			});
			if (aspirantes.length > 0) {
				return res.json(aspirantes)
			}
		} catch (error) {
			console.log(error);
		}
		return res.json('')
	}
}

module.exports = controller;