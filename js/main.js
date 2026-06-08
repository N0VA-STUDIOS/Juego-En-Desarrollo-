const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

const game = new Game(canvas, ctx);

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

function loop() {
    game.update();
    game.draw();
    requestAnimationFrame(loop);
}

loop();

window.addEventListener('resize', () => {
    resizeCanvas();
    game.groundY = canvas.height - 40;
});
