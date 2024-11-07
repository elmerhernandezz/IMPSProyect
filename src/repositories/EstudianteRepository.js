const pool = require('../config/databaseController');

const generarCodigoAleatorio = () => {
    // Genera una letra aleatoria entre 'a' y 'z'
    const letraAleatoria = () => String.fromCharCode(97 + Math.floor(Math.random() * 26));

    // Genera un dígito aleatorio entre 0 y 9
    const digitoAleatorio = () => Math.floor(Math.random() * 10);

    // Construye el código en el formato solicitado
    const codigo = `${letraAleatoria()}${letraAleatoria()}${digitoAleatorio()}${digitoAleatorio()}-` +
                   `${letraAleatoria()}${digitoAleatorio()}${digitoAleatorio()}-` +
                   `${letraAleatoria()}${digitoAleatorio()}${digitoAleatorio()}`;

    return codigo;
};

module.exports = {

    // Consulta para obtener todos los estudiantes
    obtenerTodosLosEstudiantes: async () => {
        try {
            const result = await pool.query('SELECT * FROM estudiantes');
            return result;
        } catch (error) {
            console.error('Ocurrió un problema al consultar la lista de estudiantes: ', error);
        }
    },

    // Eliminar un estudiante
    eliminarEstudiante: async (idestudiante) => {
        try {
            const result = await pool.query('DELETE FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al eliminar el registro', error);
            return false;
        }
    },

    // Agregar un nuevo estudiante
    agregarEstudiante: async (estudiante) => {
        try {
            const { nombre, apellido, email, idcarrera, usuario } = estudiante;

            const idestudiante = generarCodigoAleatorio();

            const result = await pool.query(
                'INSERT INTO estudiantes (idestudiante, nombre, apellido, email, idcarrera, usuario) VALUES (?,?, ?, ?, ?, ?)',
                [idestudiante, nombre, apellido, email, idcarrera, usuario]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al agregar el estudiante: ', error);
            return false;
        }
    },
    

    // Actualizar un estudiante
    actualizarEstudiante: async (idestudiante, estudiante) => {
        try {
            const { nombre, apellido, email, idcarrera, usuario } = estudiante;
            const result = await pool.query(
                'UPDATE estudiantes SET nombre = ?, apellido = ?, email = ?, idcarrera = ?, usuario = ? WHERE idestudiante = ?',
                [nombre, apellido, email, idcarrera, usuario, idestudiante]
            );
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Error al actualizar el estudiante: ', error);
            return false;
        }
    },

    // Obtener un estudiante por ID
    obtenerEstudiantePorId: async (idestudiante) => {
        try {
            const result = await pool.query('SELECT * FROM estudiantes WHERE idestudiante = ?', [idestudiante]);
            return result[0]; // Devuelve el primer registro encontrado
        } catch (error) {
            console.error('Error al obtener el estudiante: ', error);
        }
    }
};