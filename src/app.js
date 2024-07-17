const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const cors = require('cors');
const { sequelize } = require('./src/database/models');


// Requiriendo  archivos de rutas
// const rutasMain = require('./api/routes/mainRoutes.routes.js')
const rutasAspirantes = require('./src/api/routes/aspirantesRoutes.routes');
const rutasProfesiones = require('./src/api/routes/profesionesRoutes.routes');

const app = express();

// ************ Middlewares  ************
app.use(methodOverride('_method'));
// app.use(userLoggedMiddleware);

// CORS MIDDLEWARE
//const cors = require('cors'); aca lo pusimos dos veces
app.use(cors());

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ************ Rutas  ************
// app.use('/', rutasMain)
app.use('/api/aspirantes', rutasAspirantes)
// app.use('/api/profesiones', rutasProfesiones)

// Entrada PARA FORZAR LA CREACION DE LA BASE DE DATOS 1
// let SEQ = require('./database/models')

const port = process.env.PORT || 3737;
app.listen(port, async() => {
	// Entrada PARA FORZAR LA CREACION DE LA BASE DE DATOS 2
	// SEQ.sequelize.sync({force: true })    
	try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
        // Entrada PARA FORZAR LA CREACION DE LA BASE DE DATOS
        // await sequelize.sync({ force: true });
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
	console.log(`El servidor esta corriendo en http://localhost:${port} 🚀🚀🚀`);
});

module.exports = app;
