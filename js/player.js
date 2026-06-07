export default class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.vy = 0; // Velocidad vertical
        this.gravity = 0.8;
        this.jumpForce = -15;
        this.onGround = false;
    }

    update(input, groundY) {
        // Movimiento horizontal
        if (input.keys['a']) this.x -= 5;
        if (input.keys['d']) this.x += 5;

        // Salto
        if ((input.keys['w'] || input.keys[' ']) && this.onGround) {
            this.vy = this.jumpForce;
            this.onGround = false;
        }

        // Aplicar gravedad
        this.vy += this.gravity;
        this.y += this.vy;

        // Colisión con el piso (groundY es la altura donde está el suelo)
        if (this.y + this.height >= groundY) {
            this.y = groundY - this.height;
            this.vy = 0;
            this.onGround = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
