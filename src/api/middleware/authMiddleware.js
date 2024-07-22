const jwt = require('jsonwebtoken');
const { Aspirante } = require('../../database/models');
const bcrypt = require('bcryptjs');

// Configura una clave secreta segura en variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalido' });
    }
    req.user = user;
    next();
  });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateAccessToken = (user) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
  authenticateToken,
  hashPassword,
  comparePassword,
  generateAccessToken
};
