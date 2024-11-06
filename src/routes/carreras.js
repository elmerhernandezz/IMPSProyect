// routes/carreras.js
const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');

// Endpoint para mostrar todas las carreras
router.get('/', async (request, response) => {
    const carreras = await queries.obtenerTodasLasCarreras();
    response.render('carreras/listado', { carreras }); // Mostramos el listado de carreras
});

// Endpoint para mostrar el formulario para agregar una nueva carrera
router.get('/agregar', (request, response) => {
    response.render('carreras/agregar'); // Renderizamos el formulario
});

// Endpoint para agregar una carrera
router.post('/agregar', async (request, response) => {
    const { idcarrera, carrera } = request.body; // Extraemos los datos del formulario
    await queries.agregarCarrera({ idcarrera, carrera }); // Guardamos en la base de datos
    response.redirect('/carreras'); // Redirigimos al listado de carreras
});

// Endpoint para mostrar el formulario para editar una carrera
router.get('/editar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    const carrera = await queries.obtenerCarreraPorId(idcarrera); // Obtener datos de la carrera a editar
    response.render('carreras/editar', { carrera }); // Mostrar el formulario con los datos
});

// Endpoint para actualizar una carrera
router.post('/editar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params; // ID actual de la carrera
    const { idcarrera: nuevoIdCarrera, carrera } = request.body; // Nuevos datos, incluyendo el nuevo ID
    await queries.actualizarCarrera(idcarrera, { idcarrera: nuevoIdCarrera, carrera }); // Actualizamos la carrera
    response.redirect('/carreras'); // Redirigimos al listado de carreras
});


// Endpoint para eliminar una carrera
router.get('/eliminar/:idcarrera', async (request, response) => {
    const { idcarrera } = request.params;
    const resultado = await queries.eliminarCarrera(idcarrera);

    if (resultado > 0) {
        console.log('Eliminado con éxito');
    }

    response.redirect('/carreras');
});

module.exports = router;
