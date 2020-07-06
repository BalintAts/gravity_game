import GameObject from "./gameObject";

class Player extends GameObject {

    ctx;
    game;

    constructor(canvasContext, game) {
        super();
        this.ctx = canvasContext;
        this.game = game;
    }

    states = {
        ATTRACT: 'attract',
        REPELL: 'repell',
        OFF: 'off',
    }

    state = this.states.OFF;

    activate(level) {
    }

    draw() {
        //game.level....
        this.ctx.beginPath();
        this.ctx.arc(200, 500, 100, 0, Math.PI);
        this.ctx.stroke();
    }

    move() {
        this.draw();
    }
}

export default Player;