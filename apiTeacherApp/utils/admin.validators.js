const { validationResult } = require("express-validator");
const { getAdminById } = require("../models/admin.model");

const newAdmin = {
  name: {
    exists: true,
    trim: true,
    errorMessage: "The name field is required",
  },
  surname: {
    exists: true,
    trim: true,
    errorMessage: "The surname field is required",
  },
  email: {
    exists: {
      errorMessage: "The email field is required",
    },
    trim: true,
    isEmail: {
      errorMessage: "The email must be valid",
    },
  },
  password: {
    exists: {
      errorMessage: "The password field is required",
    },
    trim: true,
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars long",
    },
  },
  role_id: {
    exists: {
      errorMessage: "The role_id field is required",
    },
    isInt: true,
    errorMessage: "The role field must be a number",
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

module.exports = { newAdmin, checkAdmin, checkError };
