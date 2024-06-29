/* -------------------------------------------------------------------------------------- */
/* -------------------------------------> JUEGO <---------------------------------------- */
/* -------------------------------------------------------------------------------------- */

const BOTONES = document.querySelectorAll('#opciones button');
class Juego {
    constructor() {
        this.jugadorScore = 0;
        this.pcScore = 0;
        this.round = 0;
        this.opciones = ['piedra', 'papel', 'tijera', 'lagarto', 'spock'];
        this.scoreDisplay = document.getElementById('score');
        this.roundDisplay = document.getElementById('ronda');
        this.initButtons();
    };
    // Botones de las opciones.
    initButtons() {
        BOTONES.forEach(button => {
            button.addEventListener('click', () => this.jugarJuego(button.id));
        });
    };

    mostrarToast(mensaje, fondo) {
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

    // Elección del jugador y de la pc, actualización de ronda y score:
    jugarJuego(opcionJugador) {
        const OPCIONPC = this.opciones[Math.floor(Math.random() * this.opciones.length)];

        let mensaje = `La PC eligió: ${OPCIONPC}`
        let fondo = "linear-gradient(187deg, rgba(58,58,58,1) 13%, rgba(37,20,209,1) 100%)";
        this.mostrarToast(mensaje, fondo);

        const RESULTADO = this.obtenerResultado(opcionJugador, OPCIONPC);
        this.actualizarScore(RESULTADO);
        this.actualizarRonda();

        if (this.round >= 5) {
            this.finalJuego();
        };
    };

    // Obtengo GANADOR
    obtenerResultado(opcionJugador, OPCIONPC) {
        switch (opcionJugador) {
            case 'piedra':
                switch (OPCIONPC) {
                    case 'papel':
                    case 'spock':
                        return 'computadora';
                    case 'tijera':
                    case 'lagarto':
                        return 'jugador';
                    default:
                        return 'empate';
                };
            case 'papel':
                switch (OPCIONPC) {
                    case 'tijera':
                    case 'lagarto':
                        return 'computadora';
                    case 'piedra':
                    case 'spock':
                        return 'jugador';
                    default:
                        return 'empate';
                };
            case 'tijera':
                switch (OPCIONPC) {
                    case 'piedra':
                    case 'spock':
                        return 'computadora';
                    case 'papel':
                    case 'lagarto':
                        return 'jugador';
                    default:
                        return 'empate'
                };
            case 'lagarto':
                switch (OPCIONPC) {
                    case 'piedra':
                    case 'tijera':
                        return 'computadora';
                    case 'papel':
                    case 'spock':
                        return 'jugador';
                    default:
                        return 'empate';
                };
            case 'spock':
                switch (OPCIONPC) {
                    case 'papel':
                    case 'lagarto':
                        return 'computadora';
                    case 'piedra':
                    case 'tijera':
                        return 'jugador';
                    default:
                        return 'empate';
                };
            default:
                return 'empate';
        };
    };

    // Funciones para actualizar score y rondas:
    actualizarScore(RESULTADO) {
        if (RESULTADO === 'jugador') {
            this.jugadorScore++;
        } else if (RESULTADO === 'computadora') {
            this.pcScore++;
        };

        this.scoreDisplay.textContent = `Score: Jugador ${this.jugadorScore} | PC: ${this.pcScore}`;
    };

    actualizarRonda() {
        this.round++;
        this.roundDisplay.textContent = `Ronda ${this.round} de 5`;
    };

    finalJuego() {
        const GANADOR = this.jugadorScore > this.pcScore ? 'Jugador' : this.pcScore > this.jugadorScore ? 'PC' : 'Empate';

        BOTONES.forEach(function(boton) {
            boton.disabled = true;
        });

        let mensaje = `El GANADOR es ${GANADOR}`;
        let fondo = "linear-gradient(187deg, rgba(58,58,58,1) 13%, rgba(37,20,209,1) 100%)"

        this.mostrarToast(mensaje, fondo);
    
        // Esperar un poco antes de mostrar el SweetAlert
        setTimeout(() => {
            let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    
            // Guardar partida jugada
            const partida = {
                resultado: GANADOR,
                puntajeJugador: this.jugadorScore,
                puntajePC: this.pcScore,
                fecha: new Date().toLocaleString()
            };
    
            // Agregar partida a las partidas jugadas del usuario
            usuarioActual.partidas.push(partida);
    
            // Actualizar puntaje total del usuario
            usuarioActual.score += this.jugadorScore;
    
            // Guardar usuario actualizado en localStorage
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
    
            // Actualizar lista de usuarios en localStorage
            let usuarios = JSON.parse(localStorage.getItem('usuarios36886')) || [];
            usuarios = usuarios.map(user => user.usuarios === usuarioActual.usuarios ? usuarioActual : user);
            localStorage.setItem('usuarios36886', JSON.stringify(usuarios));
    
            // Mostrar SweetAlert para preguntar si quiere jugar otra ronda
            Swal.fire({
                title: "¿Querés jugar otra partida?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí",
                cancelButtonText: "No",
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    // Reiniciar el juego
                    this.jugadorScore = 0;
                    this.pcScore = 0;
                    this.round = 0;
                    this.scoreDisplay.textContent = `Score: Jugador ${this.jugadorScore} | PC: ${this.pcScore}`;
                    this.roundDisplay.textContent = `Ronda ${this.round} de 5`;

                    BOTONES.forEach(function(boton) {
                        boton.disabled = false;
                    });

                } else {
                    // Redirigir a la página de tabla de posiciones
                    setTimeout(() => {
                        window.location.replace('../pages/tabla.html');
                    }, 1000);
                }
            });
        }, 1000); // Esperar 1 segundo antes de mostrar el SweetAlert
    };
};    
const JUEGO = new Juego();