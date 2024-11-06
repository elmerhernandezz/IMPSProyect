const express = require('express');
const router = express.Router();
const queries = require('../repositories/MateriaRepository');

// Mostrar todas las materias
router.get('/', async (request, response) => {
    const materias = await queries.obtenerTodasLasMaterias();
    response.render('materias/listado', { materias }); // Mostramos el listado de materias
});

// Mostrar el formulario para agregar una nueva materia
router.get('/agregar', (request, response) => {
    response.render('materias/agregar'); // Mostramos el formulario de agregar
});

// Agregar una nueva materia
router.post('/agregar', async (request, response) => {
    const { materia } = request.body; // Extraemos los datos del formulario
    await queries.agregarMateria(materia); // Insertamos en la base de datos
    response.redirect('/materias'); // Redirigimos al listado de materias
});

// Mostrar el formulario para editar una materia
router.get('/editar/:idmateria', async (request, response) => {
    const { idmateria } = request.params;
    const materia = await queries.obtenerMateriaPorId(idmateria); // Obtener datos de la materia a editar
    response.render('materias/editar', { materia }); // Mostrar el formulario con los datos
});

// Actualizar una materia
router.post('/editar/:idmateria', async (request, response) => {
    const { idmateria } = request.params;
    const { materia } = request.body; // Nuevos datos
    await queries.actualizarMateria(idmateria, materia); // Actualizamos los datos
    response.redirect('/materias'); // Redirigimos al listado de materias
});

// Eliminar una materia
router.get('/eliminar/:idmateria', async (request, response) => {
    const { idmateria } = request.params;
    const resultado = await queries.eliminarMateria(idmateria); // Eliminamos la materia

    if (resultado > 0) {
        console.log('Eliminado con éxito');
    }

    response.redirect('/materias');
});

module.exports = router;
