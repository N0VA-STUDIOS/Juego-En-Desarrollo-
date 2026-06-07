import Player from './player.js';
import Enemy from './enemy.js';
import Input from './input.js';

export default class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.input = new Input();
        this.player = new Player(400, 300);
        this.enemies = [new Enemy(100, 100)];
        this.paused = false;
    }

    start() { this.paused = false; }

    update() {
        if (this.paused) return;
        this.player.update(this.input);
        this.enemies.forEach(e => e.update(this.player));
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        this.enemies.forEach(e => e.draw(this.ctx));
    }
}
