// Traigo elementos del HTML.
const loginForm = document.getElementById('loginForm');

// Loguearse.
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;

    // Obtengo la lista de usuarios desde localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Busco si el usuario existe
    const usuarioExistente = usuarios.find(jugador => jugador.usuario === usuario);

    if (usuarioExistente) {
        // Si el usuario existe, verifico la contraseña
        if (usuarioExistente.contrasena === contrasena) {
            usuarioExistente.ultimoLogin = new Date().toLocaleString();
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioExistente));
            Toastify({
                text: `Bienvenido ${usuarioExistente.usuario}`,
                duration: 3000,
                close: true,
                style: {
                    background: "linear-gradient(187deg, rgba(58,58,58,1) 0%, rgba(167,175,184,1) 84%)",
                    border: "1px solid white"
                },
            }).showToast();
            setTimeout(() => {
                window.location.href = '../pages/tabla.html';
            }, 1500);
        } else {
            Toastify({
                text: 'Contraseña incorrecta. Inténtelo nuevamente.',
                duration: 3000,
                close: true,
                style: {
                    background: "linear-gradient(187deg, rgba(58,58,58,1) 0%, rgba(209,20,25,1) 84%)",
                    border: "1px solid white"
                },
            }).showToast();
        };

    } else {
        // Si el usuario no existe, lo creo
        const nuevoUsuario = new Jugador(usuario, contrasena);
        const usuarioExistenteEnRegistro = usuarios.find(jugador => jugador.usuario === usuario);

        if (usuarioExistenteEnRegistro) {
            Toastify({
                text: `El usuario '${usuario}' ya existe. Por favor, elija otro nombre de usuario.`,
                duration: 3000,
                close: true,
                style: {
                    background: "linear-gradient(187deg, rgba(58,58,58,1) 0%, rgba(209,20,25,1) 84%)",
                    border: "1px solid white"
                },
            }).showToast();
        } else {
            // Agrego el nuevo usuario a la lista y actualizo localStorage
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));
            Toastify({
                text: `Usuario creado: ${nuevoUsuario.usuario}`,
                duration: 3000,
                close: true,
                style: {
                    background: "linear-gradient(187deg, rgba(58,58,58,1) 13%, rgba(41,209,20,1) 100%)",
                    border: "1px solid white"
                },
            }).showToast();
            setTimeout(() => {
                window.location.href = '../pages/tabla.html';
            }, 1500);
        };
    };
});
