const { validationResult } = require("express-validator");
const { getUserById, getRoleById } = require("../models/user.model");
const { getCityById, getLocationById } = require("../models/location.model");

/** Middleware para comprobar si hay errores en la validación */
const checkError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped());
  }

  next();
};

const checkUser = async (req, res, next) => {
  let userId;

  try {
    //Recupero el id user en función del origen
    userId =
      Object.keys(req.params).length !== 0 && req.params.userId !== undefined
        ? req.params.userId
        : req.body.user_id;

    if (userId === undefined) {
      return res.status(400).json({
        error:
          "Ocurrió un error al validar el identificador del usuario. El valor " +
          userId +
          " no existe",
      });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(400).json({
        error:
          "No existe el usuario con Id = " +
          userId +
          ". Debe darlo de alta en la base de datos.",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      error: "No se pudo verificar el usuario con Id = " + userId,
    });
  }
};

const checkCity = async (req, res, next) => {
  let cityId;

  try {
    //Recupero el id city en función del origen
    cityId =
      Object.keys(req.params).length !== 0 && req.params.cityId !== undefined
        ? req.params.cityId
        : req.body.city_id;

    if (cityId === undefined) {
      return res.status(400).json({
        error:
          "Ocurrió un error al validar el identificador de la ciudad. El valor " +
          cityId +
          " no existe",
      });
    }

    const city = await getCityById(cityId);

    if (!city) {
      return res.status(400).json({
        error:
          "No existe la ciudad con Id = " +
          cityId +
          ". Debe darla de alta en la base de datos.",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      error: "No se pudo verificar la ciudad con Id = " + cityId,
    });
  }
};

const checkLocation = async (req, res, next) => {
  let locationId;

  try {
    //Recupero el id location en función del origen
    locationId =
      Object.keys(req.params).length !== 0 &&
      req.params.locationId !== undefined
        ? req.params.locationId
        : req.body.location_id;

    if (locationId === undefined) {
      return res.status(400).json({
        error:
          "Ocurrió un error al validar el identificador de la localización. El valor " +
          locationId +
          " no existe",
      });
    }

    const location = await getLocationById(locationId);

    if (!location) {
      return res.status(400).json({
        error:
          "No existe la localización con Id = " +
          locationId +
          ". Debe darla de alta en la base de datos.",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      error: "No se pudo verificar la localización con Id = " + locationId,
    });
  }
};

const checkRole = async (req, res, next) => {
  let roleId;

  try {
    //Recupero el id location en función del origen
    roleId =
      Object.keys(req.params).length !== 0 && req.params.roleId !== undefined
        ? req.params.roleId
        : req.body.role_id;

    if (roleId === undefined) {
      return res.status(400).json({
        error:
          "Ocurrió un error al validar el identificador del rol. El valor " +
          roleId +
          " no existe",
      });
    }

    const role = await getRoleById(roleId);

    if (!role) {
      return res.status(400).json({
        error:
          "No existe el rol con Id = " +
          roleId +
          ". Debe darla de alta en la base de datos.",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({
      error: "No se pudo verificar el rol con Id = " + roleId,
    });
  }
};

module.exports = { checkError, checkUser, checkCity, checkLocation, checkRole };
