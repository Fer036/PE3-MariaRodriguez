/* -------------------------------------------------------------------------------------- */
/* -------------------------------> TABLA DE POSICIONES <-------------------------------- */
/* -------------------------------------------------------------------------------------- */
let mostrarToast = (mensaje, fondo) => {
    Toastify({
        text: mensaje,
        duration: 4000,
        close: true,
        style: {
            background: fondo,
            border: "1px solid white"
        },
    }).showToast();
};

// Muestro tabla de posiciones, y aplico funciones en botón Jugar y Cerrar Sesión.
document.addEventListener('DOMContentLoaded', () => {
    displayTablaPosiciones();

    const empezarJuego = document.getElementById('empezarJuego');
    empezarJuego.addEventListener('click', () => {
        window.location.href = '../pages/juego.html';
    });

    const cerrarSesion = document.getElementById('cerrarSesion');
    cerrarSesion.addEventListener('click', () => {
        let mensaje = 'Cerrando sesión';
        let fondo = "linear-gradient(187deg, rgba(58,58,58,1) 13%, rgba(209,20,20,1) 100%)";
        mostrarToast(mensaje, fondo);

        setTimeout(() => {
            // Eliminar usuario actual de localStorage
            localStorage.removeItem('usuarioActual');
            // Redirigir a la página de login
            window.location.href = '../index.html';
        }, 1500);
    });
});


// Mostrar tabla de posiciones con los usuarios registrados, ordenados por puntaje. 
function displayTablaPosiciones() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios36886')) || [];

    // Crear un objeto para acumular los puntajes totales por usuario
    let usuariosConPuntajeTotal = {};

    usuarios.forEach(({ usuario, score, ultimoLogin, partidas }) => {
        // Sumar el puntaje total acumulado por el usuario
        let puntajeTotal = score;
        partidas.forEach(partida => {
            if (partida.resultado === 'jugador') {
                puntajeTotal += partida.puntajeJugador;
            }
        });

        // Actualizar el objeto con el puntaje total acumulado
        usuariosConPuntajeTotal[usuario] = {
            usuario: usuario,
            score: puntajeTotal,
            ultimoLogin: ultimoLogin
        };
    });

    // Convertir el objeto en un array y ordenarlo por puntaje descendente
    let usuariosOrdenados = Object.values(usuariosConPuntajeTotal);
    usuariosOrdenados.sort((a, b) => b.score - a.score);

    const tablaPosicionesBody = document.getElementById('tablaPosicionesBody');
    tablaPosicionesBody.innerHTML = '';

    usuariosOrdenados.forEach(({ usuario, score, ultimoLogin }) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario}</td>
            <td>${score}</td>
            <td>${ultimoLogin}</td>
        `;

        tablaPosicionesBody.appendChild(row);
    });
}
