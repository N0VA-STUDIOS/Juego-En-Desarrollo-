import Player from './player.js';
import Input from './input.js';

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.input = new Input();
        
        // El suelo estará a 50px del borde inferior
        this.groundY = this.canvas.height - 50; 
        this.player = new Player(100, 200);
    }

    update() {
        this.player.update(this.input, this.groundY);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dibujar suelo
        this.ctx.fillStyle = '#555';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, 50);
        
        this.player.draw(this.ctx);
    }
}
