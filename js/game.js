class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.input = new Input();
        this.groundY = this.canvas.height - 40;

        this.player = new Player(100, 200);
        this.enemies = [];

        this.gameState = 'MENU';

        this.wave = 1;
        this.lastPausePress = false;

        // 👑 BOSS SYSTEM
        this.bossEvery = 5;
        this.bossActive = false;
        this.boss = null;

        this.enemiesPerWave = 2;
    }

    checkCollision(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }

    update() {
        const gp = this.input.updateGamepad();

        if (gp && gp.pause) {
            if (!this.lastPausePress) {
                this.togglePause();
                this.lastPausePress = true;
            }
        } else {
            this.lastPausePress = false;
        }

        if (this.gameState !== 'PLAYING') return;

        this.player.update(this.input, this.groundY);

        document.getElementById('hp-fill').style.width =
            `${Math.max(0, this.player.hp)}%`;

        // 🌊 WAVE SYSTEM
        if (this.enemies.length === 0 && !this.bossActive) {
            this.wave++;

            document.getElementById('wave-txt').innerText =
                `OLEADA: ${this.wave}`;

            if (this.wave % this.bossEvery === 0) {
                this.spawnBoss();
            } else {
                this.spawnWave();
            }
        }

        // 👾 ENEMY LOOP (SAFE REMOVE)
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];

            enemy.update(this.player, this.groundY);

            // 💥 daño enemigo → player
            if (this.checkCollision(this.player, enemy)) {
                this.player.hp -= 0.5;

                if (this.player.hp <= 0) {
                    this.gameState = 'GAMEOVER';
                    document.getElementById('gameover-menu')
                        .classList.remove('hidden');
                }
            }

            // ⚔️ player attack
            if (this.player.isAttacking) {
                const attackBox = this.player.getAttackBox();

                if (this.checkCollision(attackBox, enemy) && enemy.damageCooldown === 0) {
                    enemy.hp -= 25;
                    enemy.damageCooldown = 15;
                    enemy.x += this.player.facing * 15;
                }
            }

            // 💀 enemy dead (SAFE DELETE)
            if (enemy.hp <= 0) {

                // 👑 si era boss
                if (enemy === this.boss) {
                    this.bossActive = false;
                    this.boss = null;
                }

                this.enemies.splice(i, 1);
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#444';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, 40);

        this.ctx.fillStyle = '#1e1e1e';
        this.ctx.fillRect(0, this.groundY, this.canvas.width, 4);

        if (this.gameState !== 'MENU') {
            this.player.draw(this.ctx);
            this.enemies.forEach(e => e.draw(this.ctx));
        }
    }

    togglePause() {
        if (this.gameState === 'PLAYING') {
            this.gameState = 'PAUSE';
            document.getElementById('pause-menu').classList.remove('hidden');
        } else {
            this.gameState = 'PLAYING';
            document.getElementById('pause-menu').classList.add('hidden');
        }
    }

    restart() {
        this.player = new Player(100, 200);
        this.enemies = [];
        this.wave = 1;

        this.bossActive = false;
        this.boss = null;

        document.getElementById('wave-txt').innerText =
            `OLEADA: ${this.wave}`;

        document.getElementById('gameover-menu').classList.add('hidden');
        this.gameState = 'PLAYING';
    }

    // 👾 WAVES
    spawnWave() {
        const count = this.enemiesPerWave + this.wave;

        for (let i = 0; i < count; i++) {
            this.enemies.push(
                new Enemy(
                    Math.random() > 0.5 ? 50 : this.canvas.width - 50,
                    100,
                    this.wave * 0.2
                )
            );
        }
    }

    // 👑 BOSS
    spawnBoss() {
        this.bossActive = true;

        const boss = new Enemy(
            this.canvas.width / 2,
            100,
            this.wave * 0.3
        );

        boss.hp = 200 + this.wave * 50;

        this.boss = boss;
        this.enemies.push(boss);
    }
}
