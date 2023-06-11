const { validationResult } = require("express-validator");
const { getTeacherById, getCategoryById } = require("../models/teacher.model");

const newTeacherData = {
  username: {
    exists: true,
    trim: true,
    errorMessage: "El campo de nombre de usuario es obligatorio",
  },
  password: {
    exists: {
      errorMessage: "El campo contraseña es obligatorio",
    },
    trim: true,
    isLength: {
      options: { min: 8 },
      errorMessage: "La contraseña debe tener al menos 8 caracteres",
    },
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
  role_id: {
    exists: {
      errorMessage: "El campo de correo electrónico es obligatorio",
    },
    isInt: {
      errorMessage: "El rol debe ser un valor númerico",
    },
  },
  phone: {
    exists: {
      errorMessage: "El campo numero de telefono es obligatorio",
    },
    trim: true,
    isLength: {
      options: { min: 9, max: 9 },
      errorMessage: "El campo de teléfono debe tener 9 dígitos",
    },
  },
  avatar: {
    optional: {
      options: {
        checkFalsy: true,
        checkNull: true,
      },
    },
    trim: true,
    isURL: {
      errorMessage: "Introduzca una URL válida para el avatar",
    },
  },
  category_id: {
    exists: {
      errorMessage: "El campo categoria es obligatorio",
    },
    isInt: {
      options: { gt: 0 },
      errorMessage:
        "El campo identificador de la categoria tiene que ser un número entero mayor que cero",
    },
  },
  price_hour: {
    exists: { errorMessage: "El campo precio por hora es obligatorio" },
    trim: true,
    isNumeric: {
      errorMessage: "El campo de precio por hora debe ser un número",
    },
  },
  experience: {
    optional: true,
    isInt: {
      errorMessage: "El campo de años de experiencia debe ser un número",
    },
  },
  is_approved: {
    optional: { errorMessage: "El campo validado es obligatorio" },
    isInt: {
      errorMessage:
        "El campo validado debe ser un numero: 1(validado) - 0(No validado)",
    },
  },
  subject: {
    optional: true,
    trim: true,
  },
  latitude: {
    optional: {
      options: {
        checkFalsy: true,
        checkNull: true,
      },
    },
    isDecimal: {
      errorMessage:
        "La latitud debe ser un número decimal utilizando el . como separador",
    },
  },
  longitude: {
    optional: {
      options: {
        checkFalsy: true,
        checkNull: true,
      },
    },
    isDecimal: {
      errorMessage:
        "La longitud debe ser un número decimal utilizando el . como separador",
    },
  },
  city_id: {
    exists: {
      errorMessage: "EL campo ciudad es obligatorio",
    },
    isInt: {
      options: { gt: 0 },
      errorMessage:
        "El campo identificador de la ciudad tiene que ser un número entero mayor que cero",
    },
  },
  address: {
    optional: true,
    trim: true,
  },
  start_hour: {
    exists: {
      errorMessage: "EL campo hora de inicio de las clases es obligatorio",
    },
    isInt: {
      errorMessage: "El campo hora de inicio tiene que ser un número entero",
    },
  },
  end_hour: {
    exists: {
      errorMessage: "EL campo hora de fin de las clases es obligatorio",
    },
    isInt: {
      errorMessage: "El campo hora de fin tiene que ser un número entero",
    },
  },
};

const updateTeacherData = {
  username: {
    exists: true,
    trim: true,
    errorMessage: "El campo de nombre de usuario es obligatorio",
  },
  password: {
    exists: {
      errorMessage: "El campo contraseña es obligatorio",
    },
    trim: true,
    isLength: {
      options: { min: 8 },
      errorMessage: "La contraseña debe tener al menos 8 caracteres",
    },
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
  role_id: {
    exists: {
      errorMessage: "El campo de correo electrónico es obligatorio",
    },
    isInt: {
      errorMessage: "El rol debe ser un valor númerico",
    },
  },
  phone: {
    exists: {
      errorMessage: "El campo numero de telefono es obligatorio",
    },
    trim: true,
    isLength: {
      options: { min: 9, max: 9 },
      errorMessage: "El campo de teléfono debe tener 9 dígitos",
    },
  },
  avatar: {
    optional: {
      options: {
        checkFalsy: true,
        checkNull: true,
      },
    },
    trim: true,
    isURL: {
      errorMessage: "Introduzca una URL válida para el avatar",
    },
  },
  category_id: {
    exists: {
      errorMessage: "El campo categoria es obligatorio",
    },
    isInt: {
      options: { gt: 0 },
      errorMessage:
        "El campo identificador de la categoria tiene que ser un número entero mayor que cero",
    },
  },
  price_hour: {
    exists: { errorMessage: "El campo precio por hora es obligatorio" },
    trim: true,
    isNumeric: {
      errorMessage: "El campo de precio por hora debe ser un número",
    },
  },
  experience: {
    optional: true,
    isInt: {
      errorMessage: "El campo de años de experiencia debe ser un número",
    },
  },
  is_approved: {
    optional: { errorMessage: "El campo validado es obligatorio" },
    isInt: {
      errorMessage:
        "El campo validado debe ser un numero: 1(validado) - 0(No validado)",
    },
  },
  subject: {
    optional: true,
    trim: true,
  },
  latitude: {
    optional: {
      options: {
        checkFalsy: true,
        checkNull: true,
      },
    },
    isDecimal: {
      errorMessage:
        "La latitud debe ser un número decimal utilizando el . como separador",
    },
  },
  longitude: {
    optional: {
      options: {
        checkFalsy: true,
        checkNull: true,
      },
    },
    isDecimal: {
      errorMessage:
        "La longitud debe ser un número decimal utilizando el . como separador",
    },
  },
  city_id: {
    exists: {
      errorMessage: "EL campo ciudad es obligatorio",
    },
    isInt: {
      options: { gt: 0 },
      errorMessage:
        "El campo identificador de la ciudad tiene que ser un número entero mayor que cero",
    },
  },
  address: {
    optional: true,
    trim: true,
  },
  start_hour: {
    exists: {
      errorMessage: "EL campo hora de inicio de las clases es obligatorio",
    },
    isInt: {
      errorMessage: "El campo hora de inicio tiene que ser un número entero",
    },
  },
  end_hour: {
    exists: {
      errorMessage: "EL campo hora de fin de las clases es obligatorio",
    },
    isInt: {
      errorMessage: "El campo hora de fin tiene que ser un número entero",
    },
  },
};

const checkTeacher = async (req, res, next) => {
  let teacherId;

  try {
    //Recupero el id teacher en función del origen
    teacherId =
      Object.keys(req.params).length !== 0 && req.params.teacherId !== undefined
        ? req.params.teacherId
        : req.body.teacherId;

    if (teacherId === undefined) {
      return res.status(400).json({
        error:
          "Ocurrió un error al validar el identificador del profesor. El valor " +
          teacherId +
          " no existe",
      });
    }

    const teacher = await getTeacherById(teacherId);

    if (!teacher) {
      return res.status(400).json({
        error:
          "No existe el profesor con Id = " +
          teacherId +
          ". Debe darlo de alta en la base de datos.",
      });
    }

    next();
  } catch (error) {
    return res.json({
      error:
        "No se pudo verificar el profesor con Id = " +
        teacherId +
        ". Error " +
        error.errno +
        ": " +
        error.message,
    });
  }
};

const checkBranch = async (req, res, next) => {
  let categoryId;

  try {
    //Recupero el id branch en función del origen
    categoryId =
      Object.keys(req.params).length !== 0 &&
      req.params.categoryId !== undefined
        ? req.params.categoryId
        : req.body.category_id;

    if (categoryId === undefined) {
      return res.status(400).json({
        error:
          "Ocurrió un error al validar el identificador de la rama (branch). El valor " +
          categoryId +
          " no existe",
      });
    }

    const branch = await getCategoryById(categoryId);

    if (!branch) {
      return res.status(400).json({
        error:
          "No existe la rama con Id = " +
          categoryId +
          ". Debe darla de alta en la base de datos.",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      error:
        "No se pudo verificar la rama con Id = " +
        categoryId +
        ". Error " +
        error.errno +
        ": " +
        error.message,
    });
  }
};

const checkEmptyFields = async (req, res, next) => {
  req.body.latitude =
    req.body.latitude === "" || req.body.latitude === undefined
      ? null
      : req.body.latitude;
  req.body.longitude =
    req.body.longitude === "" || req.body.longitude === undefined
      ? null
      : req.body.longitude;
  req.body.address =
    req.body.address === "" || req.body.address === undefined
      ? null
      : req.body.address;
  req.body.avatar =
    req.body.avatar === "" || req.body.avatar === undefined
      ? null
      : req.body.avatar;
  req.body.subject =
    req.body.subject === "" || req.body.subject === undefined
      ? null
      : req.body.subject;

  next();
};

module.exports = {
  newTeacherData,
  updateTeacherData,
  checkTeacher,
  checkBranch,
  checkEmptyFields,
};
