/* -------------------------------------------------------------------------------------- */
/* -------------------------------------> JUEGO <---------------------------------------- */
/* -------------------------------------------------------------------------------------- */

class Juego {
    constructor() {
        this.jugadorScore = 0;
        this.pcScore = 0;
        this.round = 1;
        this.opciones = ['piedra', 'papel', 'tijera', 'lagarto', 'spock'];
        this.scoreDisplay = document.getElementById('score');
        this.roundDisplay = document.getElementById('ronda');
        this.resultDisplay = document.getElementById('resultado');
        this.mensajePC = document.getElementById('mensajePC');
        this.initButtons();
    };
    // Botones de las opciones.
    initButtons() {
        const botones = document.querySelectorAll('#opciones button');
        botones.forEach(button => {
            button.addEventListener('click', () => this.jugarJuego(button.id));
        });
    };

    // Elección del jugador y de la pc, actualización de ronda y score:
    jugarJuego(opcionJugador) {
        const opcionPC = this.opciones[Math.floor(Math.random() * this.opciones.length)];
        this.mensajePC.textContent = `La PC elegió: ${opcionPC}`;
        const resultado = this.obtenerResultado(opcionJugador, opcionPC);
        this.actualizarScore(resultado);
        this.actualizarRonda();

        if (this.round > 5) {
            this.finalJuego();
        };
    };

    // Obtengo ganador
    obtenerResultado(opcionJugador, opcionPC) {
        switch (opcionJugador) {
            case 'piedra':
                switch (opcionPC) {
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
                switch (opcionPC) {
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
                switch (opcionPC) {
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
                switch (opcionPC) {
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
                switch (opcionPC) {
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
    actualizarScore(resultado) {
        if (resultado === 'jugador') {
            this.jugadorScore++;
        } else if (resultado === 'computadora') {
            this.pcScore++;
        };

        this.scoreDisplay.textContent = `Score: Jugador ${this.jugadorScore} | PC: ${this.pcScore}`;
    };

    actualizarRonda() {
        this.round++;
        this.roundDisplay.textContent = `Ronda ${this.round} de 5`;
    };

    finalJuego() {
        const ganador = this.jugadorScore > this.pcScore ? 'Jugador' : this.pcScore > this.jugadorScore ? 'PC' : 'Empate';
        this.resultDisplay.textContent = `El ganador es: ${ganador}`;

        let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
        
        // Guardar partida jugada
        const partida = {
            resultado: ganador,
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
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.map(user => user.usuario === usuarioActual.usuario ? usuarioActual : user);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Resetear en caso de que quiera volver a jugar:
        let jugarOtraRonda = true;
        while (jugarOtraRonda) {
            jugarOtraRonda = confirm('¿Desea jugar otra ronda?');
            if (jugarOtraRonda) {
                this.jugadorScore = 0;
                this.pcScore = 0;
                this.round = 1;
                this.scoreDisplay.textContent = `Score: Jugador ${this.jugadorScore} | PC: ${this.pcScore}`;
                this.roundDisplay.textContent = `Ronda ${this.round} de 5`;
                this.resultDisplay.textContent = '';
                this.mensajePC.textContent = '';
                break;
            } else {
                // Redirigir a la página de tabla de posiciones
                window.location.replace('../pages/tabla.html');
            };
        };
    };
};

const juego = new Juego();