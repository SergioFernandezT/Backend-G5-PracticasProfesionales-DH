const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const cors = require('cors');

// Requiriendo  archivos de rutas
// const rutasMain = require('./api/routes/mainRoutes.routes.js')
const rutasAspirantes = require('./api/routes/aspirantesRoutes.routes');
const rutasProfesiones = require('./api/routes/profesionesRoutes.routes');

const app = express();

// ************ Middlewares  ************
app.use(methodOverride('_method'));

// CORS MIDDLEWARE
app.use(cors());

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ************ Rutas  ************
// app.use('/', rutasMain)
app.use('/api/aspirantes', rutasAspirantes)
app.use('/api/profesiones', rutasProfesiones)

const port = process.env.PORT || 3737;
app.listen(port, async() => {   
	console.log(`El servidor esta corriendo en http://localhost:${port} 🚀🚀🚀`);
});

module.exports = app;
