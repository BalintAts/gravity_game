import GameObject from "./gameObject";

// class Player extends GameObject {

//     constructor(x, y, rad) {
//         super();
//         super.posX = x;
//         super.posY = y;
//         super.rad = rad;
//     }

class Player {

    constructor(posX, posY, rad) {
        this.posX = posX;
        this.posY = posY;
        this.rad = rad;

        // super.posX = posX;
        // super.posY = posY;
        // super.rad = rad;
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
        this.ctx.save();
        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.rad, 0, 2 * Math.PI);
        // this.ctx.arc(super.posX, super.posY, super.rad, 0, Math.PI);
        this.ctx.fill();
        this.ctx.restore();

    }

    move() {
        //todo;
    }
}

export default Player;