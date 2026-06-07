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
