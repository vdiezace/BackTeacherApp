const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

// Ruta de registro para alumnos
router.post('/register/alumno', async (req, res) => {
  try {
    const { username, password, email, first_name, last_name } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Crear una nueva instancia de User
    const user = new User({
      username,
      password: await bcrypt.hash(password, 10),
      email,
      first_name,
      last_name
    });

    // Guardar el usuario en la base de datos
    await user.save();

    // Crear una nueva instancia de Student
    const student = new Student({
      user_id: user.id,
      // Agregar el resto de los datos del estudiante si es necesario
    });

    // Guardar el estudiante en la base de datos
    await student.save();

    res.status(201).json({ message: 'Alumno registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta de registro para profesores
router.post('/register/profesor', async (req, res) => {
  try {
    const { username, password, email, first_name, last_name } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Crear una nueva instancia de User
    const user = new User({
      username,
      password: await bcrypt.hash(password, 10),
      email,
      first_name,
      last_name
    });

    // Guardar el usuario en la base de datos
    await user.save();

    // Crear una nueva instancia de Teacher
    const teacher = new Teacher({
      user_id: user.id,
      // Agregar el resto de los datos del profesor si es necesario
    });

    // Guardar el profesor en la base de datos
    await teacher.save();

    res.status(201).json({ message: 'Profesor registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta de inicio de sesión
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario existe en la base de datos
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Iniciar sesión exitosamente
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;