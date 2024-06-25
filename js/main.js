// Traigo elementos del HTML.
const loginForm = document.getElementById('loginForm');
const mensaje = document.getElementById('mensaje');

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
            mensaje.textContent = `Bienvenido ${usuarioExistente.usuario}`;
            setTimeout(() => {
                window.location.href = '../pages/tabla.html';
            }, 1500);
        } else {
            mensaje.textContent = 'La contraseña ingresada es incorrecta. Por favor, inténtelo nuevamente.';
        };
        
    } else {
        // Si el usuario no existe, lo creo
        const nuevoUsuario = new Jugador(usuario, contrasena);
        const usuarioExistenteEnRegistro = usuarios.find(jugador => jugador.usuario === usuario);

        if (usuarioExistenteEnRegistro) {
            mensaje.textContent = `El usuario '${usuario}' ya existe. Por favor, elija otro nombre de usuario.`;
        } else {
            // Agrego el nuevo usuario a la lista y actualizo localStorage
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));
            mensaje.textContent = `Usuario creado: ${nuevoUsuario.usuario}`;
            setTimeout(() => {
                window.location.href = '../pages/tabla.html';
            }, 1500);
        };
    };
});
