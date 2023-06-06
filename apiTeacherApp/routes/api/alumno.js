const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Review = require('../models/Review');

// Ruta para obtener el perfil del alumno
router.get('/perfil', async (req, res) => {
  try {
    const { user_id } = req.user; // Obtener el ID del usuario autenticado

    // Obtener el alumno según el ID de usuario
    const student = await Student.findOne({ user_id }).populate('user');

    if (!student) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    res.status(200).json({ student });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para puntuar y opinar sobre un profesor
router.post('/profesores/:id/puntuar-opinar', async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    // Verificar si el profesor existe en la base de datos
    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    // Obtener el ID del alumno autenticado
    const { user_id } = req.user;

    // Verificar si el alumno ya ha puntuado y opinado sobre el profesor
    const existingReview = await Review.findOne({ teacher_id: id, student_id: user_id });

    if (existingReview) {
      return res.status(400).json({ error: 'El alumno ya ha puntuado y opinado sobre este profesor' });
    }

    // Crear una nueva instancia de Review
    const review = new Review({
      teacher_id: id,
      student_id: user_id,
      rating,
      comment
    });

    // Guardar la puntuación y opinión en la base de datos
    await review.save();

    res.status(201).json({ message: 'Puntuación y opinión guardadas exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;