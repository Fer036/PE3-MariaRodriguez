// Inicio
const maxx = document.body.clientWidth;
const maxy = document.body.clientHeight;
const halfx = maxx / 2;
const halfy = maxy / 2;

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = maxx;
canvas.height = maxy;

const context = canvas.getContext("2d");
const dotCount = 200;
const dots = [];

// Componentes del background
class Dot {
    constructor() {
        this.rad_x = 2 * Math.random() * halfx + 1;
        this.rad_y = 1.2 * Math.random() * halfy + 1;
        this.alpha = Math.random() * 360 + 1;
        this.speed = Math.random() * 100 < 50 ? 1 : -1;
        this.speed *= 0.1;
        this.size = Math.random() * 5 + 1;
        this.color = Math.floor(Math.random() * 256);
    }

    draw() {
        // calc polar coord to cartesian
        const dx = halfx + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
        const dy = halfy + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);
        // set color
        context.fillStyle = `rgb(${this.color}, ${this.color}, ${this.color})`;
        // draw dot
        context.fillRect(dx, dy, this.size, this.size);
    }

    move() {
        this.alpha += this.speed;
        // change color
        if (Math.random() * 100 < 50) {
            this.color = (this.color + 1) % 256;
        } else {
            this.color = (this.color - 1 + 256) % 256;
        }
    }
}

// Creación de puntos
for (let i = 0; i < dotCount; i++) {
    dots.push(new Dot());
}

// Animación de puntos
function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, maxx, maxy);
    for (const dot of dots) {
        dot.draw();
        dot.move();
    }
    requestAnimationFrame(render);
}

render();
