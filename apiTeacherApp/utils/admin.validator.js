const { validationResult } = require("express-validator");
const { getAdminById } = require("../models/admin.model");

const newAdminData = {
  name: {
    exists: true,
    trim: true,
    errorMessage: "El campo de nombre es obligatorio",
  },
  surname: {
    exists: true,
    trim: true,
    errorMessage: "El campo de apellido es obligatorio",
  },
  email: {
    exists: {
      errorMessage: "El campo de correo electrónico es obligatorio",
    },
    trim: true,
    isEmail: {
      errorMessage: "El correo electrónico debe ser válido",
    },
  },
  password: {
    exists: {
      errorMessage: "El campo de contraseña es obligatorio",
    },
    trim: true,
    isLength: {
      options: { min: 8 },
      errorMessage: "La contraseña debe tener al menos 8 caracteres",
    },
  },
  role_id: {
    exists: {
      errorMessage: "El campo de role_id es obligatorio",
    },
    isInt: true,
    errorMessage: "El campo de role debe ser un número",
  },
};

/** Middleware para comprobar si hay errores en la validación */
const checkError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  next();
};

const checkAdmin = async (req, res, next) => {
  const { adminid } = req.params;
  if (await getAdminById(adminid)) {
    next();
  } else {
    res.status(404).json({ Message: "El administrador no existe" });
  }
};

module.exports = { newAdminData, checkAdmin, checkError };
