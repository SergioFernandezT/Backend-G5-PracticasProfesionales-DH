Proyecto Full Stack

Este proyecto está dividido en dos partes: un backend desarrollado con Node.js y Express, y un frontend construido con React y Tailwind CSS. Utilizamos MySQL como base de datos, gestionada con XAMPP y MySQL Workbench.

Estructura del Proyecto

Backend: Proporciona las API necesarias para la funcionalidad del proyecto. Frontend: Interactúa con el backend y proporciona la interfaz de usuario.

Tecnologías Utilizadas

Backend Node.js y Express: Framework para construir aplicaciones web y API. Sequelize: ORM para interactuar con la base de datos MySQL. MySQL2: Driver para conectar con MySQL. jsonwebtoken: Para autenticación y manejo de tokens JWT. bcrypt y bcryptjs: Para encriptar contraseñas. cors: Middleware para habilitar CORS. method-override: Para soportar métodos HTTP PUT y DELETE en formularios.

Frontend

React: Biblioteca de JavaScript para construir interfaces de usuario. Tailwind CSS: Framework de CSS para diseño responsivo y utilidades de estilo. Configuración de la Base de Datos La base de datos se gestiona utilizando XAMPP para iniciar el servidor MySQL y MySQL Workbench para gestionar y realizar consultas en la base de datos.

Instrucciones para Levantar el Servidor

Prerrequisitos Asegúrate de tener Node.js y npm instalados. Instala XAMPP y asegúrate de que el servicio MySQL esté corriendo. Asegúrate de tener MySQL Workbench para gestionar la base de datos.

Backend

Clona el repositorio: https://github.com/SergioFernandezT/Backend-G5-PracticasProfesionales-DH.git

En tu terminal: git clone https://github.com/SergioFernandezT/Backend-G5-PracticasProfesionales-DH.git

Navega al directorio del backend:

cd Backend-G5-PracticasProfesionales-DH

Instala las dependencias:

npm install Configura la base de datos en src/database/config/config.js con tus credenciales de MySQL.

Ejecuta las migraciones y seeders (si existen):

npx sequelize-cli db:migrate npx sequelize-cli db:seed:all

Inicia el servidor:

npm run dev El backend debería estar corriendo en http://localhost:3737.

Frontend Clona el repositorio: https://github.com/SergioFernandezT/Frontend-G5-PracticasProfesionales-DH.git

En tu terminal: git clone https://github.com/SergioFernandezT/Frontend-G5-PracticasProfesionales-DH.git

Navega al directorio del frontend:

cd Frontend-G5-PracticasProfesionales-DH

Instala las dependencias:

npm install

Inicia el servidor de desarrollo:

npm run dev El frontend debería estar corriendo en http://localhost:5173.

Creditos a desarrolladores: Catalina Laporte Agustin Miqueas Castellon Sergio Fernandez Maria Vedia Victor Rodriguez Mastias Ortega Emilce Mercedes Soto
