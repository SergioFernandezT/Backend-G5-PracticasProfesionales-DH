const express = require("express");
const path = require("path");
const methodOverride = require('method-override');

// Requiriendo  archivos de rutas
// const rutasMain = require('./api/routes/mainRoutes.routes.js')
const rutasAspirantes = require('./api/routes/aspirantesRoutes.routes.js')
const rutasProfesiones = require('./api/routes/profesionesRoutes.routes.js')

const app = express();

// ************ Middlewares  ************
app.use(methodOverride('_method'));
// app.use(userLoggedMiddleware);

// CORS MIDDLEWARE
const cors = require('cors');
app.use(cors());

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ************ Rutas  ************
// app.use('/', rutasMain)
// app.use('/api/aspirantes', rutasAspirantes)
// app.use('/api/profesiones', rutasProfesiones)

// Entrada PARA FORZAR LA CREACION DE LA BASE DE DATOS 1
// let SEQ = require('./database/models')

const port = process.env.PORT || 3737;
app.listen(port, () => {
	// Entrada PARA FORZAR LA CREACION DE LA BASE DE DATOS 2
	// SEQ.sequelize.sync({force: true })    
	console.log(`El servidor esta corriendo en http://localhost:${port} 🚀🚀🚀`);
});
