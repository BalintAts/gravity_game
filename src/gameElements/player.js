import GameObject from "./gameObject";

class Player {

    game;
    rad = 50; //this is always the same
    verticalSpeed = 0;
    horizontalSpeed = 0;

    states = {
        ATTRACT: 'attract',
        REPELL: 'repell',
        OFF: 'off',
    }
    state = this.states.OFF;

    constructor(posX, posY, game) {
        this.posX = posX;
        this.posY = posY;
        this.game = game;
    }

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
        // for (let i; i < this.game.level.gameObjects; i++) {
        //     let distanceX = this.game.level.gameObjects[i].posX - this.posX;
        //     let distanceY = this.game.level.gameObjects[i].posY - this.posY;
        //     let distance = Math.sqrt(distanceX * distanceX   +   distanceY * distanceY)
        //     let direction = Math.atan(distanceY / distanceX);

        // }
        let distanceX = this.game.level.gameObjects[1].posX - this.posX;
        let distanceY = this.game.level.gameObjects[1].posY - this.posY;
        let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
        let direction = Math.atan(distanceY / distanceX);
        console.log({ direction });
        this.posX = this.posX + Math.cos(direction);
        this.posY = this.posY + Math.sin(direction);

    }
}

export default Player;