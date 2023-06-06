var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//Vicky aquí empieza el código que he creado, revisalo please.

const express = require('express');
const router = express.Router();

// Importar los archivos de rutas
const authRoutes = require('./auth');
const publicRoutes = require('./public');
const adminRoutes = require('./admin');
const profesorRoutes = require('./profesor');
const alumnoRoutes = require('./alumno');
const mensajesRoutes = require('./mensajes');

// Rutas relacionadas con la autenticación
router.use('/auth', authRoutes);

// Rutas públicas
router.use('/public', publicRoutes);

// Rutas para el administrador
router.use('/admin', adminRoutes);

// Rutas para el profesor
router.use('/profesor', profesorRoutes);

// Rutas para el alumno
router.use('/alumno', alumnoRoutes);

// Rutas para los mensajes
router.use('/mensajes', mensajesRoutes);

module.exports = router;