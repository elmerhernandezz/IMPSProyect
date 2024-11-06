const express = require('express');
const router = express.Router();
const queries = require('../repositories/EstudianteRepository');
const queriesCarreras = require('../repositories/CarreraRepository');

// Endpoint para mostrar todos los estudiantes
router.get('/', async (request, response) => {
    const estudiantes = await queries.obtenerTodosLosEstudiantes();
    response.render('estudiantes/listado', { estudiantes }); // Mostramos el listado de estudiantes
});

// Endpoint que permite mostrar el formulario para agregar un nuevo estudiante
router.get('/agregar', async (request, response) => {
    const carreras = await queriesCarreras.obtenerTodasLasCarreras(); // Obtenemos las carreras desde la base de datos
    response.render('estudiantes/agregar', { carreras }); // Pasamos las carreras a la vista
});

// Endpoint para agregar un estudiante
router.post('/agregar', async (request, response) => {
    const { nombre, apellido, email, idcarrera, usuario } = request.body; // Extraemos los datos del formulario
    await queries.agregarEstudiante({ nombre, apellido, email, idcarrera, usuario }); // Guardamos en la base de datos
    response.redirect('/estudiantes'); // Redirigimos al listado de estudiantes
});

// Endpoint que permite mostrar el formulario para editar un estudiante
router.get('/editar/:idestudiante', async (request, response) => {
    const { idestudiante } = request.params;
    const estudiante = await queries.obtenerEstudiantePorId(idestudiante); // Obtener datos del estudiante a editar
    const carreras = await queriesCarreras.obtenerTodasLasCarreras(); // Obtenemos las carreras desde la base de datos
    response.render('estudiantes/editar', { estudiante, carreras }); // Pasamos carreras también a la vista
});

// Endpoint para actualizar un estudiante
router.post('/editar/:idestudiante', async (request, response) => {
    const { idestudiante } = request.params;
    const { nombre, apellido, email, idcarrera, usuario } = request.body; // Nuevos datos
    await queries.actualizarEstudiante(idestudiante, { nombre, apellido, email, idcarrera, usuario }); // Actualizamos los datos
    response.redirect('/estudiantes'); // Redirigimos al listado de estudiantes
});

// Endpoint que permite eliminar un estudiante
router.get('/eliminar/:idestudiante', async (request, response) => {
    const { idestudiante } = request.params;
    const resultado = await queries.eliminarEstudiante(idestudiante);

    if (resultado > 0) {
        console.log('Eliminado con éxito');
    }

    response.redirect('/estudiantes');
});

module.exports = router;