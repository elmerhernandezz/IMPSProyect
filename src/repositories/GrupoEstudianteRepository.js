const pool = require('../config/databaseController');

// Obtener todos los grupo_estudiantes con información de grupo y estudiante
const obtenerTodosLosGrupoEstudiantes = async () => {
    const result = await pool.query(`
        SELECT 
            ge.idgrupoestudiante, 
            g.num_grupo AS grupo, 
            CONCAT(e.nombre, ' ', e.apellido) AS estudiante
        FROM grupo_estudiantes ge
        JOIN grupos g ON ge.idgrupo = g.idgrupo
        JOIN estudiantes e ON ge.idestudiante = e.idestudiante
    `);
    return result;
};

// Obtener un grupo_estudiante por ID
const obtenerGrupoEstudiantePorId = async (idgrupoestudiante) => {
    const result = await pool.query('SELECT * FROM grupo_estudiantes WHERE idgrupoestudiante = ?', [idgrupoestudiante]);
    return result[0];
};

// Agregar un nuevo grupo_estudiante
const agregarGrupoEstudiante = async (data) => {
    await pool.query('INSERT INTO grupo_estudiantes SET ?', [data]);
};

// Actualizar un grupo_estudiante
const actualizarGrupoEstudiante = async (idgrupoestudiante, data) => {
    await pool.query('UPDATE grupo_estudiantes SET ? WHERE idgrupoestudiante = ?', [data, idgrupoestudiante]);
};

// Eliminar un grupo_estudiante
const eliminarGrupoEstudiante = async (idgrupoestudiante) => {
    await pool.query('DELETE FROM grupo_estudiantes WHERE idgrupoestudiante = ?', [idgrupoestudiante]);
};

module.exports = {
    obtenerTodosLosGrupoEstudiantes,
    obtenerGrupoEstudiantePorId,
    agregarGrupoEstudiante,
    actualizarGrupoEstudiante,
    eliminarGrupoEstudiante
};
