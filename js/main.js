const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Resoluciones internas fijas para mantener el aspecto del lienzo
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const game = new Game(canvas, ctx);

// Listeners de los botones de la interfaz
document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');
    game.gameState = 'PLAYING';
});

document.getElementById('resume-btn').addEventListener('click', () => {
    game.togglePause();
});

document.getElementById('restart-btn').addEventListener('click', () => {
    game.restart();
});

// Bucle básico de renderizado e inputs
function loop() {
    game.update();
    game.draw();
    requestAnimationFrame(loop);
}

loop();
