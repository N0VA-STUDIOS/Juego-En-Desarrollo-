class Player {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.width = 32; this.height = 42;
        this.vy = 0; this.gravity = 0.6;
        this.jumpForce = -12; this.onGround = false;
        this.speed = 4;
        
        this.maxHp = 100; this.hp = 100;
        this.facing = 1; // 1 = Derecha, -1 = Izquierda
        
        this.isAttacking = false;
        this.attackTimer = 0;
        this.attackCooldown = 0;
    }

    update(input, groundY) {
        const gp = input.updateGamepad();

        // Movimiento en eje X
        let moveDir = 0;
        if (input.keys['a']) moveDir = -1;
        if (input.keys['d']) moveDir = 1;
        if (gp && gp.moveX !== 0) moveDir = gp.moveX;

        this.x += moveDir * this.speed;
        if (moveDir !== 0) this.facing = moveDir > 0 ? 1 : -1;

        // Salto (W, Espacio o Botón A)
        const jumpPressed = input.keys['w'] || input.keys[' '] || (gp && gp.jump);
        if (jumpPressed && this.onGround) {
            this.vy = this.jumpForce;
            this.onGround = false;
        }

        // Control del ataque cuerpo a cuerpo (F o Botón X)
        if (this.attackCooldown > 0) this.attackCooldown--;
        
        const attackPressed = input.keys['f'] || (gp && gp.attack);
        if (attackPressed && !this.isAttacking && this.attackCooldown === 0) {
            this.isAttacking = true;
            this.attackTimer = 10;  // Frames activos del golpe
            this.attackCooldown = 25; // Delay de reutilización
        }

        if (this.isAttacking) {
            this.attackTimer--;
            if (this.attackTimer <= 0) this.isAttacking = false;
        }

        // Aplicar gravedad
        this.vy += this.gravity;
        this.y += this.vy;

        // Colisión con la plataforma/suelo
        if (this.y + this.height >= groundY) {
            this.y = groundY - this.height;
            this.vy = 0;
            this.onGround = true;
        }
    }

    draw(ctx) {
        // Visualización del área de golpe
        if (this.isAttacking) {
            ctx.fillStyle = 'rgba(255, 235, 59, 0.4)';
            const rangeX = this.facing === 1 ? this.x + this.width : this.x - 40;
            ctx.fillRect(rangeX, this.y + 5, 40, this.height - 10);
        }

        // Cuadrante del jugador
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Indicador de dirección (Visor)
        ctx.fillStyle = 'white';
        const eyeX = this.facing === 1 ? this.x + this.width - 10 : this.x + 4;
        ctx.fillRect(eyeX, this.y + 8, 6, 6);
    }

    getAttackBox() {
        return {
            x: this.facing === 1 ? this.x + this.width : this.x - 40,
            y: this.y + 5,
            width: 40,
            height: this.height - 10
        };
    }
}
