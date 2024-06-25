/* -------------------------------------------------------------------------------------- */
/* --------------------------------> DATOS DEL JUGADOR <--------------------------------- */
/* -------------------------------------------------------------------------------------- */
class Jugador {
    constructor(usuario, contrasena, score = 0, ultimoLogin = null, partidas = []) {
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.score = score;
        this.ultimoLogin = ultimoLogin || new Date().toLocaleString();
        this.partidas = partidas;
    };
};