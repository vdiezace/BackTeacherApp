const express = require('express');
const router = express.Router();

const Teacher = require('../models/Teacher');
const Location = require('../models/Location');
const Review = require('../models/Review');

// Ruta para obtener todos los profesores cercanos a la ubicación
router.get('/profesores/cercanos', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    // Obtener la ubicación más cercana a la latitud y longitud especificadas
    const location = await Location.findOne().sort({
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        distanceField: 'distance',
        maxDistance: 5000, // Distancia máxima en metros
        spherical: true
      }
    });

    if (!location) {
      return res.status(404).json({ error: 'No se encontraron profesores cercanos a la ubicación especificada' });
    }

    // Obtener los profesores en la ubicación encontrada
    const teachers = await Teacher.find({ locations_id: location.id });

    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para obtener los profesores mejor puntuados
router.get('/profesores/mejor-puntuados', async (req, res) => {
  try {
    // Obtener las puntuaciones promedio de los profesores
    const teacherRatings = await Review.aggregate([
      {
        $group: {
          _id: '$teacher_id',
          averageRating: { $avg: '$rating' }
        }
      }
    ]);

    // Obtener los profesores con las puntuaciones promedio más altas
    const topTeachers = await Teacher.aggregate([
      {
        $match: {
          id: { $in: teacherRatings.map(rating => rating._id) }
        }
      },
      {
        $sort: {
          'rating.averageRating': -1
        }
      }
    ]);

    res.status(200).json({ topTeachers });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;