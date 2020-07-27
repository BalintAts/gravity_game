
class Player {

    game;
    rad = 50; //this is always the same
    verticalSpeed = 0;
    horizontalSpeed = 0;
    speedRatio = 10;
    lives = 3;
    score = 0;
    state = 0;

    constructor(posX, posY, game) {
        this.posX = posX;
        this.posY = posY;
        this.game = game;
        this.img = new Image();
        this.img.source = "/logo192.png";
    }


    // draw = (ctx) => {
    //     if (!this.img.complete) {
    //         // setTimeout(function () {
    //         //     this.draw(ctx, this.img);
    //         // }, 50);
    //         return;
    //     }
    //     // this.img.onload = this.drawUfo;
    //     ctx.drawImage(this.img, this.posX, this.posY, 150, 150);
    // }


    // drawUfo(ctx) {
    //     ctx.drawImage(this.img, this.posX, this.posY, 150, 150);
    // }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.rad, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }


    // draw(ctx) {
    //     let img = new Image();
    //     img.src = "/logo192.png";
    //     img.onload = drawImageTest;

    //     function drawImageTest() {
    //         ctx.drawImage(img, 150, 150);
    //     }

    // }



    checkCollectable(levelObject, distance) {
        if (distance < this.rad + levelObject.rad && levelObject.collectable === true && levelObject.visible === true) {
            levelObject.visible = false;
            this.score++;
            this.game.checkLevelCompleted();
        }
    }


    move() {
        for (let levelObject of this.game.level.gameObjects) {
            let distanceX = levelObject.posX - this.posX;
            let distanceY = levelObject.posY - this.posY;

            let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
            let direction = Math.atan(distanceY / distanceX);

            this.checkCollectable(levelObject, distance);

            let AccMagnitude = this.state * levelObject.mass / (distance * distance);    //radius is in ratio with mass, player's mass = 1
            if (this.posX > levelObject.posX) {
                AccMagnitude *= -1
            }

            if (levelObject.gravitable) {
                if (distance > 20) {   //the condition avoids quantum
                    this.horizontalSpeed += AccMagnitude * Math.cos(direction);
                    this.verticalSpeed += AccMagnitude * Math.sin(direction);
                }
            }

            this.posX += this.horizontalSpeed * this.speedRatio;
            this.posY += this.verticalSpeed * this.speedRatio;

            if (this.posX + this.rad > this.game.width || this.posX - this.rad <= 0) {
                this.horizontalSpeed *= -1;
            }
            if (this.posY + this.rad > this.game.height || this.posY - this.rad <= 0) {
                this.verticalSpeed *= -1;
            }


        }
    }
}

export default Player;