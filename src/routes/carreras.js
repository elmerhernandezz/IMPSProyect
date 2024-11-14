// routes/carreras.js
const express = require('express');
const router = express.Router();
const queries = require('../repositories/CarreraRepository');
const { isLoggedIn } = require('../lib/auth');

// Endpoint para mostrar todas las carreras
router.get('/', isLoggedIn, async (request, response) => {
    const carreras = await queries.obtenerTodasLasCarreras();
    response.render('carreras/listado', { carreras }); // Mostramos el listado de carreras
});

// Endpoint para mostrar el formulario para agregar una nueva carrera
router.get('/agregar', isLoggedIn, async (request, response) => {
    response.render('carreras/agregar'); // Renderizamos el formulario
});

// Endpoint para agregar una carrera

router.post('/agregar', isLoggedIn, async (request, response) => {
    const { idcarrera, carrera } = request.body;
    const nuevaCarrera = { carrera, idcarrera };
    
    // Se trata de una inserción
    const resultado = await queries.agregarCarrera(nuevaCarrera);
    
    if (resultado) {
        request.flash('success', 'Registro insertado con éxito');
    } else {
        request.flash('error', 'Ocurrió un problema al guardar el registro');
    }
    
    response.redirect('/carreras');
});


// Endpoint para mostrar el formulario para editar una carrera
router.get('/editar/:idcarrera', isLoggedIn, async (request, response) => {
    const { idcarrera } = request.params;
    const carrera = await queries.obtenerCarreraPorId(idcarrera); // Obtener datos de la carrera a editar
    response.render('carreras/editar', { carrera }); // Mostrar el formulario con los datos
});

// Endpoint para actualizar una carrera
router.post('/editar/:idcarrera', isLoggedIn, async (request, response) => {
    const { idcarrera } = request.params; // ID actual de la carrera
    const { idcarrera: nuevoIdCarrera, carrera } = request.body; // Nuevos datos, incluyendo el nuevo ID
    
    const nuevaCarrera = { idcarrera: nuevoIdCarrera, carrera }; // Nueva carrera con los datos actualizados
    const actualizacion = await queries.actualizarCarrera(idcarrera, nuevaCarrera); // Intentamos actualizar la carrera
    
    if (actualizacion) {
        request.flash('success', 'Registro actualizado con éxito');
    } else {
        request.flash('error', 'Ocurrió un problema al actualizar el registro');
    }

    response.redirect('/carreras'); // Redirigimos al listado de carreras
});


// Endpoint para eliminar una carrera
router.get('/eliminar/:idcarrera', isLoggedIn, async (request, response) => {
    // Desestructuramos el objeto que nos mandan en la petición y extraemos el idcarrera
    const { idcarrera } = request.params;
    const resultado = await queries.eliminarCarrera(idcarrera);

    if (resultado > 0) {
        request.flash('success', 'Eliminación correcta');
    } else {
        request.flash('error', 'Error al eliminar');
    }

    response.redirect('/carreras');
});

module.exports = router;
