const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const Message = require('../models/Message');

// Ruta para enviar un mensaje a un profesor
router.post('/profesores/:id/mensaje', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Verificar si el profesor existe en la base de datos
    const teacher = await Teacher.findById(id);

    if (!teacher) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    // Obtener el ID del alumno autenticado
    const { user_id } = req.user;

    // Crear una nueva instancia de Message
    const message = new Message({
      sender_id: user_id,
      receiver_id: teacher.user_id,
      content
    });

    // Guardar el mensaje en la base de datos
    await message.save();

    res.status(201).json({ message: 'Mensaje enviado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para enviar un mensaje a un alumno
router.post('/alumnos/:id/mensaje', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    // Verificar si el alumno existe en la base de datos
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ error: 'Alumno no encontrado' });
    }

    // Obtener el ID del profesor autenticado
    const { user_id } = req.user;

    // Crear una nueva instancia de Message
    const message = new Message({
      sender_id: user_id,
      receiver_id: student.user_id,
      content
    });

    // Guardar el mensaje en la base de datos
    await message.save();

    res.status(201).json({ message: 'Mensaje enviado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;