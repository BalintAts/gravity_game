import GameObject from "./gameObject";

// class Player extends GameObject {

//     constructor(x, y, rad) {
//         super();
//         super.posX = x;
//         super.posY = y;
//         super.rad = rad;
//     }

class Player {

    posX;
    posX;
    rad;

    constructor(posX, posY, rad) {
        this.posX = posX;
        this.posY = posY;
        this.rad = rad;
    }

    states = {
        ATTRACT: 'attract',
        REPELL: 'repell',
        OFF: 'off',
    }

    state = this.states.OFF;



    activate(level) {
    }

    draw(color) {
        //game.level....
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.rad, 0, Math.PI);
        // this.ctx.arc(250, 250, 150, 0, Math.PI);

        this.ctx.fill();

    }

    move() {
        //todo;
    }
}

export default Player;