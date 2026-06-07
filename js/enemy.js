class Enemy {
    constructor(x, y, speedMod = 0) {
        this.x = x; this.y = y;
        this.width = 30; this.height = 42;
        this.vy = 0; this.gravity = 0.6;
        this.speed = 1.2 + speedMod;
        this.maxHp = 50; this.hp = 50;
        this.damageCooldown = 0;
    }

    update(player, groundY) {
        // Caída por gravedad
        this.vy += this.gravity;
        this.y += this.vy;

        if (this.y + this.height >= groundY) {
            this.y = groundY - this.height;
            this.vy = 0;
        }

        if (this.damageCooldown > 0) this.damageCooldown--;

        // Seguimiento inteligente en X hacia la posición del jugador
        if (this.x < player.x) this.x += this.speed;
        else this.x -= this.speed;
    }

    draw(ctx) {
        // Parpadea en rojo si ha recibido daño reciente
        ctx.fillStyle = this.damageCooldown > 0 ? '#ef4444' : '#22c55e';
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Renderizado de su barra de salud local
        const barW = 30;
        const barH = 5;
        const currentBarW = (this.hp / this.maxHp) * barW;
        ctx.fillStyle = '#000';
        ctx.fillRect(this.x, this.y - 10, barW, barH);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(this.x, this.y - 10, currentBarW, barH);
    }
}
