/* -------------------------------------------------------------------------------------- */
/* -------------------------------> TABLA DE POSICIONES <-------------------------------- */
/* -------------------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    displayTablaPosiciones();

    const empezarJuego = document.getElementById('empezarJuego');
    empezarJuego.addEventListener('click', () => {
        window.location.href = '../pages/juego.html';
    });

    const cerrarSesion = document.getElementById('cerrarSesion');
    cerrarSesion.addEventListener('click', () => {
        // Eliminar usuario actual de localStorage
        localStorage.removeItem('usuarioActual');
        // Redirigir a la página de login
        window.location.href = '../index.html';
    });
});

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
