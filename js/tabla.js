/* -------------------------------------------------------------------------------------- */
/* -------------------------------> TABLA DE POSICIONES <-------------------------------- */
/* -------------------------------------------------------------------------------------- */

// Muestro tabla de posiciones, y aplico funciones en botón Jugar y Cerrar Sesión.
document.addEventListener('DOMContentLoaded', () => {
    displayTablaPosiciones();

    const empezarJuego = document.getElementById('empezarJuego');
    empezarJuego.addEventListener('click', () => {
        window.location.href = '../pages/juego.html';
    });

    const cerrarSesion = document.getElementById('cerrarSesion');
    cerrarSesion.addEventListener('click', () => {
        Toastify({
            text: 'Cerrando sesión',
            duration: 3000,
            close: true,
            style: {
                background: "linear-gradient(187deg, rgba(58,58,58,1) 13%, rgba(209,20,20,1) 100%)",
                border: "1px solid white"
            },
        }).showToast();
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
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.sort((a, b) => b.score - a.score);

    const tablaPosicionesBody = document.getElementById('tablaPosicionesBody');
    tablaPosicionesBody.innerHTML = '';

    usuarios.forEach(({ usuario, score, ultimoLogin }) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${usuario}</td>
        <td>${score}</td>
        <td>${ultimoLogin}</td>
        `;

        tablaPosicionesBody.appendChild(row);
    });
}
