const jwt = require('jsonwebtoken');
// const { Aspirante } = require('../../database/models');
const bcrypt = require('bcryptjs');

// Configura una clave secreta segura en variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[0];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado, no se ha proporcionado token' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateAccessToken = (user) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
  authenticateToken,
  comparePassword,
  generateAccessToken
};
