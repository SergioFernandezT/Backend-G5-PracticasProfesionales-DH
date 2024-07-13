const db = require('../../database/models');

const profesionesController = {
    // Listar todas las profesiones
    getAll: (req, res) => {
        db.query('SELECT * FROM profesiones', (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(results);
            }
        });
    },

    // Crear una nueva profesión
    create: (req, res) => {
        const { profesion } = req.body;
        db.query('INSERT INTO profesiones (profesion) VALUES (?)', [profesion], (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(201).send('Profesión creada');
            }
        });
    },

    // Eliminar una profesión por ID
    delete: (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM profesiones WHERE id = ?', [id], (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send('Profesión eliminada');
            }
        });
    },

    // Modificar una profesión por ID
    update: (req, res) => {
        const { id } = req.params;
        const { profesion } = req.body;
        db.query('UPDATE profesiones SET profesion = ? WHERE id = ?', [profesion, id], (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send('Profesión modificada');
            }
        });
    },

    // Buscar una profesión por ID
    getById: (req, res) => {
        const { id } = req.params;
        db.query('SELECT * FROM profesiones WHERE id = ?', [id], (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(results[0]);
            }
        });
    }
};

module.exports = profesionesController;
