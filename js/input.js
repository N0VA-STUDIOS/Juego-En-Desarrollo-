class Input {
    constructor() {
        this.keys = {};
        window.addEventListener('keydown', e => this.keys[e.key.toLowerCase()] = true);
        window.addEventListener('keyup', e => this.keys[e.key.toLowerCase()] = false);
    }

    // Retorna el estado actual del mando mapeado para Xbox
    updateGamepad() {
        const gamepads = navigator.getGamepads();
        if (!gamepads || !gamepads[0]) return null;
        const gp = gamepads[0];
        
        return {
            moveX: Math.abs(gp.axes[0]) > 0.2 ? gp.axes[0] : 0,
            jump: gp.buttons[0].pressed,   /* Botón A */
            attack: gp.buttons[2].pressed,  /* Botón X */
            pause: gp.buttons[9].pressed    /* Botón Start / Menú */
        };
    }
}
