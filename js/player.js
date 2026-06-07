export default class Player {
    constructor(x, y) {
        this.x = x; this.y = y; this.hp = 100;
        this.size = 30;
    }

    update(input) {
        if (input.keys['w']) this.y -= 5;
        if (input.keys['s']) this.y += 5;
        if (input.keys['a']) this.x -= 5;
        if (input.keys['d']) this.x += 5;
        // Soporte Gamepad básico
        const gp = navigator.getGamepads()[0];
        if (gp) {
            this.x += gp.axes[0] * 5;
            this.y += gp.axes[1] * 5;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}
