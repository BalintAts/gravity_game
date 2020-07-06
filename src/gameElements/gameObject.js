class GameObject {
    canvas;
    posX;
    posY;
    size;
    rot;
    imgUri;
    levelRef;

    constructor(x, y, rad) {
        this.posX = x;
        this.posY = y;
        this.size = rad;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.rad, 0, Math.PI);
        this.ctx.stroke();
    }

}

export default GameObject;