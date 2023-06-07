const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

// Ruta para obtener el listado de alumnos
router.get('/alumnos', async (req, res) => {
  try {
    const alumnos = await User.find({ role_id: 1 }).populate('student');
    res.status(200).json({ alumnos });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para dar de baja a un alumno
router.put('/alumnos/:id/baja', async (req, res) => {
  try {
    const { id } = req.params;

    // Dar de baja al alumno en la base de datos
    await User.findByIdAndUpdate(id, { $set: { active: false } });

    res.status(200).json({ message: 'Alumno dado de baja exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para obtener el listado de profesores
router.get('/profesores', async (req, res) => {
  try {
    const profesores = await User.find({ role_id: 2 }).populate('teacher');
    res.status(200).json({ profesores });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para validar a un profesor
router.put('/profesores/:id/validar', async (req, res) => {
  try {
    const { id } = req.params;

    // Validar al profesor en la base de datos
    await Teacher.findByIdAndUpdate(id, { $set: { is_approved: true } });

    res.status(200).json({ message: 'Profesor validado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;