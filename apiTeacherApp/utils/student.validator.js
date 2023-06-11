const { validationResult } = require("express-validator");
const { getLocationById } = require("../models/location.model");

const newStudent = {
  username: {
    exists: true,
    trim: true,
    errorMessage: "El campo de nombre de usuario es obligatorio",
  },
  password: {
    exists: true,
    trim: true,
    isLength: {
      options: { min: 8 },
      errorMessage: "La contraseña debe tener al menos 8 caracteres",
    },
    errorMessage: "El campo de contraseña es obligatorio",
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
  firstName: {
    exists: true,
    trim: true,
    errorMessage: "El campo de nombre es obligatorio",
  },
  lastName: {
    exists: true,
    trim: true,
    errorMessage: "El campo de apellido es obligatorio",
  },
  phone: {
    exists: true,
    trim: true,
    isNumeric: {
      errorMessage: "El campo de teléfono debe contener solo números",
    },
    isLength: {
      options: { min: 9, max: 9 },
      errorMessage: "El campo de teléfono debe tener 9 dígitos",
    },
    errorMessage: "El campo de teléfono es obligatorio",
  },
  avatar: {
    exists: true,
    trim: true,
    isURL: {
      errorMessage: "El avatar debe ser una URL válida",
    },
    errorMessage: "El campo de avatar es obligatorio",
  },
  locationId: {
    exists: {
      errorMessage: "El campo de locationId es obligatorio",
    },
    isInt: {
      errorMessage: "El campo de locationId debe ser un número",
    },
    custom: {
      options: async (value) => {
        const location = await getLocationById(value);
        if (!location) {
          throw new Error("locationId inválido");
        }
        return true;
      },
    },
  },
};

const checkError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }
  next();
};

module.exports = { newStudent, checkError };