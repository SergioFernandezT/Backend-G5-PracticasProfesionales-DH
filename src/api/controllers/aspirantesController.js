const { Aspirante, Profesion, Sequelize } = require('../../database/models/');
const db = require('../../database/models/index');
const Op = db.Sequelize.Op;
const { comparePassword, generateAccessToken } = require('../middleware/authMiddleware');

const controller = {
    getAspirantes: async (req, res) => {
        try {
            const aspirantes = await Aspirante.findAll({
                attributes: ['id', 'nombre', 'apellido', 'descripcion', 'email', 'imagen'],
                include: { model: Profesion, as: 'profesiones_de_aspirante' },
            },);
            res.json(aspirantes);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener aspirantes', error });
        }
    },
    getAspirante: async (req, res) => {
        try {
            const id = req.params.id;
            const aspirante = await Aspirante.findByPk(id,{
                attributes: {exclude: ['password','profesion_id']},
                include: { model: Profesion, as: 'profesiones_de_aspirante' },
            });
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
            const updated = await Aspirante.update(req.body, {
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
            const aspirantes = await Aspirante.findAll({
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
    searchAspirantesByName: async (req, res) => {
        try {
            const { name } = req.params;

            // Buscar tanto en el nombre como en el apellido
            const aspirantes = await Aspirante.findAll({
                where: {
                    [Op.or]: [
                        { nombre: { [Op.like]: `%${name}%` } },
                        { apellido: { [Op.like]: `%${name}%` } }
                    ]
                }
            });

            if (aspirantes.length > 0) {
                return res.json(aspirantes);
            } else {
                return res.status(404).json({ message: 'No se encontraron aspirantes' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al buscar aspirantes', error });
        }
    },
    register: async (req, res) => {
        const { nombre, apellido, email, password, dni, telefono, linkedin, fecha_nacimiento, gender, imagen, descripcion, profesion_id, role } = req.body;

        try {
            const existingUser = await Aspirante.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'El correo ya esta en uso' });
            }
            const newUser = await Aspirante.create({
                nombre: nombre,
                apellido: apellido,
                dni: dni,
                sexo: gender,
                fecha_nacimiento: fecha_nacimiento,
                email: email,
                password: password,
                telefono: telefono,
                perfil_linkedin: linkedin,
                imagen: imagen,
                descripcion: descripcion,
                profesion_id: profesion_id,
                rol: role
            });

            // Al registrar, no generamos un token, solo confirmamos el registro
            res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error del servidor', error });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await Aspirante.findOne({attributes:['id','password'], where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            const isPasswordValid = await comparePassword(password, user.password);
            // console.log(!isPasswordValid);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Credenciales inválidas' });
            }

            const token = generateAccessToken({ id: user.id, email: user.email });

            // Enviar token y confirmar inicio de sesión exitoso
            res.status(200).json({ message: 'Inicio de sesión exitoso', 'token': token, 'id': user.id });
        } catch (error) {
            res.status(500).json({ message: 'Error del servidor', error });
        }
    },

    // Obtener la cantidad de aspirantes por profesión
    getAspirantesPorProfesion: async (req, res) => {
        try {
            const aspirantesPorProfesion = await Profesion.findAll({
                attributes: [
                    'profesion',
                    [Sequelize.fn('COUNT', Sequelize.col('aspirantes_de_profesion.id')), 'cantidad']
                ],
                include: [{
                    model: Aspirante,
                    as: 'aspirantes_de_profesion',
                    attributes: []
                }],
                group: ['Profesion.id']
            });

            res.json(aspirantesPorProfesion);
        } catch (error) {
            console.error(error); // Log para depuración
            res.status(500).json({ error: error.message });
        }
    }
};


module.exports = controller;
