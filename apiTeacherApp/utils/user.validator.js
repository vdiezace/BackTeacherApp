const { validatorResult } = require("express-validator");
const { getUserById, getByEmail } = require("../models/user.model");
const { getTeacherById } = require("../models/teacher.model");

const newUserData = {
  first_name: {
    exists: true,
    trim: true,
    errorMessage: "El campo de nombre es obligatorio",
  },
  last_name: {
    exists: true,
    trim: true,
    errorMessage: "El campo de apellido es obligatorio",
  },
  username: {
    exists: true,
    trim: true,
    errorMessage: "El campo de nombre de usuario es obligatorio",
  },
  email: {
    exists: {
      errorMessage: "El campo de email es obligatorio",
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
      errorMessage: "El campo de rol es obligatorio",
    },
    isInt: true,
    errorMessage: "El campo de role debe ser un número",
  },
};

const checkUser = async (req, res, next) => {
  const { userId } = req.params;
  if (await getUserById(userId)) {
    next();
  } else {
    res.status(404).json({ Message: "El usuario no existe" });
  }
};

const checkEmail = async (req, res, next) => {
  const { emailId } = req.params;
  if (await getByEmail(emailId)) {
    next();
  } else {
    res.status(404).json({ Message: "El email no existe" });
  }
};

const checkTeacher = async (req, res, next) => {
  const { teacherId } = req.params;
  if (await getTeacherById(teacherId)) {
    next();
  } else {
    res.status(404).json({ Message: "El email no existe" });
  }
};

module.exports = { newUserData, checkUser, checkEmail, checkTeacher };
