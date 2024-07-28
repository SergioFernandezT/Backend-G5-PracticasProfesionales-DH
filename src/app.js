const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const cors = require('cors');
const bodyParser = require('body-parser');

// Requiriendo  archivos de rutas
// const rutasMain = require('./api/routes/mainRoutes.routes.js')
const rutasAspirantes = require('./api/routes/aspirantesRoutes.routes');
const rutasProfesiones = require('./api/routes/profesionesRoutes.routes');

const app = express();

// CORS MIDDLEWARE
app.use(cors());

// ************ Middlewares  ************
app.use(methodOverride('_method'));
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({limit: '30mb',extended: true}));

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
