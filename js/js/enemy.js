export default class Enemy {
    constructor(x, y) {
        this.x = x; this.y = y; this.hp = 50;
    }

    update(player) {
        // IA simple: seguir al jugador
        if (this.x < player.x) this.x += 2;
        else this.x -= 2;
        if (this.y < player.y) this.y += 2;
        else this.y -= 2;
    }

    draw(ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, 30, 30);
    }
}
