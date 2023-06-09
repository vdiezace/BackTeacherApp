const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

// Función para generar un token de autenticación
const generateToken = (user) => {
  // Crear un objeto con los datos del usuario y la expiración del token
  const obj = {
    user_id: user.id, // ID del usuario
    user_role: user.role, // Rol del usuario
    exp: dayjs().add(7, 'days').unix() // Expiración del token: 7 días a partir de la fecha actual
  };

  // Firmar y generar el token utilizando el objeto y la clave secreta
  return jwt.sign(obj, process.env.SECRET_KEY);
};

module.exports = {
  generateToken
};