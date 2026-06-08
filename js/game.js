class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.input = new Input();
        this.groundY = this.canvas.height - 40;
        
        this.player = new Player(100, 200);
        this.enemies = [new Enemy(650, 200)];
        
        this.gameState = 'MENU'; // Estados: MENU, PLAYING, PAUSE, GAMEOVER
        this.wave = 1;
        this.lastPausePress = false;
        
        this.bossEvery = 5;
        this.bossActive = false;
        this.boss = null;
        this.enemiesPerWave = 2;
    
    }

    // Detector de colisión clásico AABB
    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    update() {
        const gp = this.input.updateGamepad();
        
        // Manejo del botón de Pausa (Start)
        if (gp && gp.pause) {
            if (!this.lastPausePress) {
                this.togglePause();
                this.lastPausePress = true;
            }
        } else {
            this.lastPausePress = false;
        }

        if (this.gameState !== 'PLAYING') return;

        // Actualizar jugador
        this.player.update(this.input, this.groundY);
        document.getElementById('hp-fill').style.width = `${Math.max(0, this.player.hp)}%`;

      if (this.enemies.length === 0 && !this.bossActive) {
    this.wave++;

    document.getElementById('wave-txt').innerText =
        `OLEADA: ${this.wave}`;

    // 👑 BOSS CHECK
    if (this.wave % this.bossEvery === 0) {
        this.spawnBoss();
    } else {
        this.spawnWave();
    }
}
        // Ciclo de colisiones y actualizaciones de enemigos
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            let enemy = this.enemies[i];
            enemy.update(this.player, this.groundY);

            // Ataque del zombi al jugador
            if (this.checkCollision(this.player, enemy)) {
                this.player.hp -= 0.5;
                if (this.player.hp <= 0) {
                    this.gameState = 'GAMEOVER';
                    document.getElementById('gameover-menu').classList.remove('hidden');
                }
            }

            // Ataque del jugador al zombi
            if (this.player.isAttacking) {
                const attackBox = this.player.getAttackBox();
                if (this.checkCollision(attackBox, enemy) && enemy.damageCooldown === 0) {
                    enemy.hp -= 25;
                    enemy.damageCooldown = 15;
                    enemy.x += this.player.facing * 15; // Efecto empuje (Knockback)
                }
            }

            if (enemy.hp <= 0) {
                this.enemies.splice(i, 1);
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Dibujado del piso del escenario
        this.ctx.fillStyle = '#444444';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, 40);
        this.ctx.fillStyle = '#1e1e1e';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, 4);

        // Renderizado general de entidades
        if (this.gameState !== 'MENU') {
            this.player.draw(this.ctx);
            this.enemies.forEach(enemy => enemy.draw(ctx));
        }
    }

    togglePause() {
        if (this.gameState === 'PLAYING') {
            this.gameState = 'PAUSE';
            document.getElementById('pause-menu').classList.remove('hidden');
        } else if (this.gameState === 'PAUSE') {
            this.gameState = 'PLAYING';
            document.getElementById('pause-menu').classList.add('hidden');
        }
    }

    restart() {
        this.player = new Player(100, 200);
        this.wave = 1;
        this.enemies = [new Enemy(650, 200)];
        document.getElementById('wave-txt').innerText = `OLEADA: ${this.wave}`;
        document.getElementById('gameover-menu').classList.add('hidden');
        this.gameState = 'PLAYING';
    }
}

spawnBoss() {
    this.bossActive = true;

    this.boss = new Enemy(
        this.canvas.width / 2,
        100,
        this.wave * 0.3
    );

    this.boss.hp = 200 + this.wave * 50; // más vida
    this.enemies.push(this.boss);
}
