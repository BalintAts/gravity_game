import GameObject from "./gameObject";

class Player extends GameObject {

    constructor(x, y, rad) {
        super();
        super.posX = x;
        super.posY = y;
        super.rad = rad;
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
        this.ctx.fillStyle = "ff0000";
        this.ctx.beginPath();
        this.ctx.arc(super.posX, super.posY, super.rad, 0, Math.PI);
        this.ctx.fill();

    }

    move() {
        //todo;
    }
}

export default Player;