const { validationResult } = require("express-validator");
const { getStudentById } = require("../models/student.model");

const newStudentData = {
  username: {
    exists: { errorMessage: "El campo de nombre de usuario es obligatorio" },
    trim: true,
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
      errorMessage: "El campo rol es obligatorio",
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
  is_active: {
    optional: true,
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
};

const updateStudentData = {
  username: {
    exists: { errorMessage: "El campo de nombre de usuario es obligatorio" },
    trim: true,
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
      errorMessage: "El campo rol es obligatorio",
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
  is_active: {
    optional: true,
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
};

const checkStudent = async (req, res, next) => {
  let studentId;

  try {
    //Recupero el id teacher en función del origen
    studentId =
      Object.keys(req.params).length !== 0 && req.params.studentId !== undefined
        ? req.params.studentId
        : req.body.studentId;

    if (studentId === undefined) {
      return res.status(400).json({
        error:
          "Ocurrió un error al validar el ID del estudiante. El valor " +
          studentId +
          " no existe",
      });
    }

    const teacher = await getStudentById(studentId);

    if (!teacher) {
      return res.status(400).json({
        error:
          "No existe el estudiante con Id = " +
          studentId +
          ". Debe darlo de alta en la base de datos.",
      });
    }

    next();
  } catch (error) {
    return res.json({
      error: "No se pudo verificar el estudiante con Id = " + studentId,
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

  next();
};

module.exports = {
  newStudentData,
  updateStudentData,
  checkStudent,
  checkEmptyFields,
};
