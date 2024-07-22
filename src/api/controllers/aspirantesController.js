const { Aspirante } = require('../../database/models/');
const db = require('../../database/models/index');
const Op = db.Sequelize.Op;
const { hashPassword, comparePassword, generateAccessToken } = require('../middleware/authMiddleware');

const controller = {
    getAspirantes: async (req, res) => {
        try {
            const aspirantes = await Aspirante.findAll();
            res.json(aspirantes);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener aspirantes', error });
        }
    },
    getAspirante: async (req, res) => {
        try {
            const id = req.params.id;
            const aspirante = await Aspirante.findByPk(id);
            if (aspirante) {
                res.json(aspirante);
            } else {
                res.status(404).json({ message: 'Aspirante no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener aspirante', error });
        }
    },
    createAspirante: async (req, res) => {
        try {
            const aspirante = await Aspirante.create(req.body);
            res.json(aspirante);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear aspirante', error });
        }
    },
    updateAspirante: async (req, res) => {
        try {
            const [updated] = await Aspirante.update(req.body, {
                where: {
                    id: req.params.id
                },
                individualHooks: true // Se asegura de que los Hooks definidos en el modelo funcionen
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
    deleteAspirante: async (req, res) => {
        try {
            const deleted = await Aspirante.destroy({
                where: {
                    id: req.params.id
                }
            });
            if (deleted) {
                res.status(204).json({ message: 'Aspirante eliminado' });
            } else {
                res.status(404).json({ message: 'Aspirante no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el aspirante', error });
        }
    },
    searchAspirantes: async (req, res) => {
        try {
            let aspirantes = await Aspirante.findAll({
                where: {
                    descripcion: { [Op.like]: `%${req.params.keywords}%` }
                }
            });
            if (aspirantes.length > 0) {
                return res.json(aspirantes);
            }
        } catch (error) {
            console.log(error);
        }
        return res.status(404).json({ message: 'No se encontraron aspirantes' });
    },
    register: async (req, res) => {
        const { email, password, nombre } = req.body;

        try {
            const existingUser = await Aspirante.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }

            const hashedPassword = await hashPassword(password);

            const newUser = await Aspirante.create({
                email,
                password: hashedPassword,
                nombre
            });

            // Al registrar, no generamos un token, solo confirmamos el registro
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor', error });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await Aspirante.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const isPasswordValid = await comparePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Credenciales inválidas' });
            }

            const token = generateAccessToken({ id: user.id, email: user.email });

            // Enviar token y confirmar inicio de sesión exitoso
            res.status(200).json({ message: 'Inicio de sesión exitoso', token });
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor', error });
        }
    }
};


module.exports = controller;
