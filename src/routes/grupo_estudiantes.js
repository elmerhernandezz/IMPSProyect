const express = require('express');
const router = express.Router();
const queries = require('../repositories/GrupoEstudianteRepository');
const queriesGrupos = require('../repositories/GrupoRepository');
const queriesEstudiantes = require('../repositories/EstudianteRepository');

// Ruta para mostrar todos los grupo_estudiantes
router.get('/', async (req, res) => {
    const grupoEstudiantes = await queries.obtenerTodosLosGrupoEstudiantes();
    res.render('grupo_estudiantes/listado', { grupoEstudiantes });
});


// Ruta para mostrar el formulario para agregar un grupo_estudiante
router.get('/agregar', async (req, res) => {
    const grupos = await queriesGrupos.obtenerTodosLosGrupos();
    const estudiantes = await queriesEstudiantes.obtenerTodosLosEstudiantes();
    res.render('grupo_estudiantes/agregar', { grupos, estudiantes });
});

// Ruta para agregar un nuevo grupo_estudiante
router.post('/agregar', async (req, res) => {
    const { idgrupo, idestudiante } = req.body;
    await queries.agregarGrupoEstudiante({ idgrupo, idestudiante });
    res.redirect('/grupo_estudiantes');
});

// Ruta para mostrar el formulario para editar un grupo_estudiante
router.get('/editar/:idgrupoestudiante', async (req, res) => {
    const { idgrupoestudiante } = req.params;
    const grupoEstudiante = await queries.obtenerGrupoEstudiantePorId(idgrupoestudiante);
    const grupos = await queriesGrupos.obtenerTodosLosGrupos();
    const estudiantes = await queriesEstudiantes.obtenerTodosLosEstudiantes();
    res.render('grupo_estudiantes/editar', { grupoEstudiante, grupos, estudiantes });
});

// Ruta para actualizar un grupo_estudiante
router.post('/editar/:idgrupoestudiante', async (req, res) => {
    const { idgrupoestudiante } = req.params;
    const { idgrupo, idestudiante } = req.body;
    await queries.actualizarGrupoEstudiante(idgrupoestudiante, { idgrupo, idestudiante });
    res.redirect('/grupo_estudiantes');
});

// Ruta para eliminar un grupo_estudiante
router.get('/eliminar/:idgrupoestudiante', async (req, res) => {
    const { idgrupoestudiante } = req.params;
    await queries.eliminarGrupoEstudiante(idgrupoestudiante);
    res.redirect('/grupo_estudiantes');
});

module.exports = router;
