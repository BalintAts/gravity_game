import GameObject from "./gameObject";

class Player {

    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }


    rad = 50; //this is always the same
    speed = 0;


    states = {
        ATTRACT: 'attract',
        REPELL: 'repell',
        OFF: 'off',
    }

    state = this.states.OFF;



    activate(level) {
    }

    draw() {

        this.ctx.save();
        this.ctx.fillStyle = "red";
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.rad, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.restore();

    }

    move() {
        //for game.level....  
    }
}

export default Player;