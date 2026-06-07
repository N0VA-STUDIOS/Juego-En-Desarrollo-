// Añade esto al inicio de main.js para asegurar que el canvas sea grande
const canvas = document.getElementById('gameCanvas');
canvas.width = 800;
canvas.height = 400;

import Game from './game.js';
const game = new Game(canvas);

// ... resto del código (menús, etc.)

import Game from './game.js';

const canvas = document.getElementById('gameCanvas');
const game = new Game(canvas);

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    game.start();
});

// Loop principal
function loop() {
    game.update();
    game.draw();
    requestAnimationFrame(loop);
}
loop();
