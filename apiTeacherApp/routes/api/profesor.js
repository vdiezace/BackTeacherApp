const express = require('express');
const router = express.Router();

const Teacher = require('../models/Teacher');
const User = require('../models/User');
const Student = require('../models/Student');
const Review = require('../models/Review');

// Ruta para obtener el perfil del profesor
router.get('/perfil', async (req, res) => {
  try {
    const { user_id } = req.user; // Obtener el ID del usuario autenticado

    // Obtener el profesor según el ID de usuario
    const teacher = await Teacher.findOne({ user_id }).populate('user');

    if (!teacher) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    res.status(200).json({ teacher });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para obtener los datos de los alumnos inscritos con el profesor
router.get('/alumnos', async (req, res) => {
  try {
    const { user_id } = req.user; // Obtener el ID del usuario autenticado

    // Obtener el profesor según el ID de usuario
    const teacher = await Teacher.findOne({ user_id });

    if (!teacher) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    // Obtener los alumnos inscritos con el profesor
    const students = await Student.find({ teacher_id: teacher.id }).populate('user');

    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;