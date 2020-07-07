class GameObject {
    posX;
    posY;
    size;
    rot;
    imgUri;
    levelRef;
    game;
    ctx;

    constructor(x, y, rad) {
        this.posX = x;
        this.posY = y;
        this.size = rad;
    }

    draw() {

        this.ctx.fillStyle = "ff0000";
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.rad, 0, Math.PI);
        this.ctx.fill();
    }

}

export default GameObject;