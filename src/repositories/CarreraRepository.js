// repositories/CarreraRepository.js
const pool = require('../config/databaseController');

module.exports = {
    // Obtener todas las carreras
    obtenerTodasLasCarreras: async () => {
        try {
            const result = await pool.query('SELECT * FROM carreras');
            return result;
        } catch (error) {
            console.error('Error al consultar la lista de carreras: ', error);
        }
    },

    // Agregar una nueva carrera
    agregarCarrera: async (carrera) => {
        try {
            const { idcarrera, carrera: nombreCarrera } = carrera; // Usamos 'carrera' como nombre de variable
            const result = await pool.query(
                'INSERT INTO carreras (idcarrera, carrera) VALUES (?, ?)',
                [idcarrera, nombreCarrera]
            );
            return result.insertId;
        } catch (error) {
            console.error('Error al agregar la carrera: ', error);
        }
    },

    // Obtener una carrera por ID
    obtenerCarreraPorId: async (idcarrera) => {
        try {
            const result = await pool.query('SELECT * FROM carreras WHERE idcarrera = ?', [idcarrera]);
            return result[0]; // Devuelve el primer registro encontrado
        } catch (error) {
            console.error('Error al obtener la carrera: ', error);
        }
    },

    // Actualizar una carrera
    actualizarCarrera: async (idcarreraActual, carreraActualizada) => {
        try {
            const { idcarrera, carrera } = carreraActualizada; // Incluir el nuevo idcarrera
            const result = await pool.query(
                'UPDATE carreras SET idcarrera = ?, carrera = ? WHERE idcarrera = ?',
                [idcarrera, carrera, idcarreraActual]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar la carrera: ', error);
        }
    },

    // Eliminar una carrera
    eliminarCarrera: async (idcarrera) => {
        try {
            const result = await pool.query('DELETE FROM carreras WHERE idcarrera = ?', [idcarrera]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar la carrera: ', error);
        }
    }
};
