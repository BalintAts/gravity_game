import GameObject from "./gameObject";

class Player {

    game;
    rad = 50; //this is always the same
    verticalSpeed = 0;
    horizontalSpeed = 0;
    speedRatio = 10;

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
        for (let gravitable of this.game.level.gameObjects) {
            // let distanceX = this.game.level.gameObjects[1].posX - this.posX;
            // let distanceY = this.game.level.gameObjects[1].posY - this.posY;

            let distanceX = gravitable.posX - this.posX;
            let distanceY = gravitable.posY - this.posY;

            let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
            let direction = Math.atan(distanceY / distanceX) + Math.PI;
            console.log({ distance });

            // let AccMagnitude = this.game.level.gameObjects[1].rad / (distance * distance);    //radius is in ratio with mass, player's mass = 1
            let AccMagnitude = gravitable.rad / (distance * distance);    //radius is in ratio with mass, player's mass = 1

            if (distance > 200) {
                this.horizontalSpeed += AccMagnitude * Math.cos(direction);
                this.verticalSpeed += AccMagnitude * Math.sin(direction);
            }

            this.posX += this.horizontalSpeed * this.speedRatio;
            this.posY += this.verticalSpeed * this.speedRatio;
            direction = 0;
        }
    }
}

export default Player;