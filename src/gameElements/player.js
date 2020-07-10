import GameObject from "./gameObject";

class Player {

    game;
    rad = 50; //this is always the same
    verticalSpeed = 0;
    horizontalSpeed = 0;
    speedRatio = 10;


    state = 0;

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

    checkCollectable(levelObject, distance) {
        if (distance < this.rad + levelObject.rad && levelObject.collectable === true) {
            levelObject.visible = false;
        }


    }

    move() {
        // for (let i; i < this.game.level.gameObjects; i++) {
        //     let distanceX = this.game.level.gameObjects[i].posX - this.posX;
        //     let distanceY = this.game.level.gameObjects[i].posY - this.posY;
        //     let distance = Math.sqrt(distanceX * distanceX   +   distanceY * distanceY)
        //     let direction = Math.atan(distanceY / distanceX);

        // }



        for (let levelObject of this.game.level.gameObjects) {
            // let distanceX = this.game.level.gameObjects[1].posX - this.posX;
            // let distanceY = this.game.level.gameObjects[1].posY - this.posY;

            let distanceX = levelObject.posX - this.posX;
            let distanceY = levelObject.posY - this.posY;

            let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
            let direction = Math.atan(distanceY / distanceX);

            this.checkCollectable(levelObject, distance);

            // let AccMagnitude = this.game.level.gameObjects[1].rad / (distance * distance);    //radius is in ratio with mass, player's mass = 1
            let AccMagnitude = this.state * levelObject.rad / (distance * distance);    //radius is in ratio with mass, player's mass = 1

            console.log(levelObject.gravitable);
            if (levelObject.gravitable) {
                if (distance > 20) {   //the condition avoids quantum
                    this.horizontalSpeed += AccMagnitude * Math.cos(direction);
                    this.verticalSpeed += AccMagnitude * Math.sin(direction);
                }
            }

            this.posX += this.horizontalSpeed * this.speedRatio;
            this.posY += this.verticalSpeed * this.speedRatio;
            direction = 0;
        }


    }
}

export default Player;