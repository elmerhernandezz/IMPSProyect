const express = require('express');
const router = express.Router();
const queries = require('../repositories/GrupoRepository');
const queriesMaterias = require('../repositories/MateriaRepository');
const queriesProfesores = require('../repositories/ProfesorRepository');

// Endpoint para mostrar todos los grupos
router.get('/', async (req, res) => {
    const grupos = await queries.obtenerTodosLosGrupos();
    res.render('grupos/listado', { grupos });
});

// Endpoint para mostrar el formulario para agregar un grupo
router.get('/agregar', async (req, res) => {
    const materias = await queriesMaterias.obtenerTodasLasMaterias();
    const profesores = await queriesProfesores.obtenerTodosLosProfesores();
    res.render('grupos/agregar', { materias, profesores });
});

// Endpoint para agregar un grupo
router.post('/agregar', async (req, res) => {
    const { num_grupo, anio, ciclo, idmateria, idprofesor } = req.body;
    await queries.agregarGrupo({ num_grupo, anio, ciclo, idmateria, idprofesor });
    res.redirect('/grupos');
});

// Endpoint para mostrar el formulario para editar un grupo
router.get('/editar/:idgrupo', async (req, res) => {
    const { idgrupo } = req.params;
    const grupo = await queries.obtenerGrupoPorId(idgrupo);
    const materias = await queriesMaterias.obtenerTodasLasMaterias();
    const profesores = await queriesProfesores.obtenerTodosLosProfesores();
    res.render('grupos/editar', { grupo, materias, profesores });
});

// Endpoint para actualizar un grupo
router.post('/editar/:idgrupo', async (req, res) => {
    const { idgrupo } = req.params;
    const { num_grupo, anio, ciclo, idmateria, idprofesor } = req.body;
    await queries.actualizarGrupo(idgrupo, { num_grupo, anio, ciclo, idmateria, idprofesor });
    res.redirect('/grupos');
});

// Endpoint para eliminar un grupo
router.get('/eliminar/:idgrupo', async (req, res) => {
    const { idgrupo } = req.params;
    await queries.eliminarGrupo(idgrupo);
    res.redirect('/grupos');
});

module.exports = router;
