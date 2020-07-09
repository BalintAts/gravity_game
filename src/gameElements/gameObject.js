class GameObject {

    constructor(x, y, rad, mass, gravitable, collectable, color) {
        this.posX = x;
        this.posY = y;
        this.rad = rad;
        this.gravitable = gravitable;
        this.collectable = collectable;
        this.color = color;
    }

    draw() {

        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.rad, 0, 2 * Math.PI);
        this.ctx.fill();
        // console.log("drawn");
    }

}

export default GameObject;