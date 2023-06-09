const jwt = require("jsonwebtoken");
const { getById } = require("../models/user.model");

// Middleware para verificar el token de autenticación
const checkToken = async (req, res, next) => {
  // ¿Viene incluida la cabecera de Authorization?
  if (!req.headers["authorization"]) {
    return res
      .status(401)
      .json({ error: "Debes incluir la cabecera de Autorización" });
  }

  // Recuperar el token de la cabecera
  const token = req.headers["authorization"];
  let obj;
  try {
    // Verificar y decodificar el token utilizando la clave secreta
    obj = jwt.verify(token, process.env.SECRET_KEY);
    req.data = obj;
    //Recuperar los datos del usuario logado utilizando el modelo de usuario por su ID
    // const [users] = await getById(obj.user_id);
    // req.user = users[0]; // Asignar los datos del usuario al objeto `req` para su uso posterior en las rutas

    next(); // Llamar a `next()` para pasar al siguiente middleware o a la ruta correspondiente
  } catch (error) {
    return res.status(401).json({ error: error.message }); // Devolver un error si el token es inválido
  }
};

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.data.user_role !== role) {
      return res.status(401).json({
        error: `Restringido el acceso. Solo usuarios con role: ${role}`,
      });
    }

    next();
  };
};

module.exports = { checkToken, checkRole };
