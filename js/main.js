// Traigo elementos del HTML.
const loginForm = document.getElementById('loginForm');

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

// Función para validar el input: sacar los espacios y que sea más de tres caracteres
function validarInput(input) {

    input.value = input.value.replace(/\s+/g, '');


    if (input.value.length < 3) {
        input.setCustomValidity('usuario y contraselña debe tener más de 3 caracteres.');
    } else {
        input.setCustomValidity('');
    };
};

// Loguearse.
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // valido lo ingresado por el usuario-
    const usuarioInput = document.getElementById('usuario');
    const contrasenaInput = document.getElementById('contrasena');

    validarInput(usuarioInput);
    validarInput(contrasenaInput);

    if (usuarioInput.checkValidity() && contrasenaInput.checkValidity()) {
        const usuario = usuarioInput.value;
        const contrasena = contrasenaInput.value;

        // Obtengo la lista de usuarios desde localStorage
        let usuarios = JSON.parse(localStorage.getItem('usuarios36886')) || [];

        // Busco si el usuario existe
        const usuarioExistente = usuarios.find(jugador => jugador.usuario === usuario);

        if (usuarioExistente) {
            // Si el usuario existe, verifico la contraseña
            if (usuarioExistente.contrasena === contrasena) {
                usuarioExistente.ultimoLogin = new Date().toLocaleString();
                localStorage.setItem('usuarioActual', JSON.stringify(usuarioExistente));

                let mensaje = `Bienvenido ${usuarioExistente.usuario}`;
                let fondo = "linear-gradient(187deg, rgba(58,58,58,1) 0%, rgba(167,175,184,1) 84%)";
                mostrarToast(mensaje, fondo);

                setTimeout(() => {
                    window.location.href = '../pages/tabla.html';
                }, 1500);
            } else {
                let mensaje = 'Contraseña incorrecta. Inténtelo nuevamente.';
                let fondo = "linear-gradient(187deg, rgba(58,58,58,1) 0%, rgba(209,20,25,1) 84%)";
                mostrarToast(mensaje, fondo);
            };
        } else {
            // Si el usuario no existe, lo creo
            const nuevoUsuario = new Jugador(usuario, contrasena);
            const usuarioExistenteEnRegistro = usuarios.find(jugador => jugador.usuario === usuario);

            if (usuarioExistenteEnRegistro) {
                let mensaje = `El usuario '${usuario}' ya existe. Por favor, elija otro nombre de usuario.`;
                let fondo = "linear-gradient(187deg, rgba(58,58,58,1) 0%, rgba(209,20,25,1) 84%)";
                mostrarToast(mensaje, fondo);
            } else {
                // Agrego el nuevo usuario a la lista y actualizo localStorage
                usuarios.push(nuevoUsuario);
                localStorage.setItem('usuarios36886', JSON.stringify(usuarios));
                localStorage.setItem('usuarioActual', JSON.stringify(nuevoUsuario));

                let mensaje = `Usuario creado: ${nuevoUsuario.usuario}`;
                let fondo = "linear-gradient(187deg, rgba(58,58,58,1) 13%, rgba(41,209,20,1) 100%)";
                mostrarToast(mensaje, fondo);
                setTimeout(() => {
                    window.location.href = '../pages/tabla.html';
                }, 1500);
            };
        };
    };
});
