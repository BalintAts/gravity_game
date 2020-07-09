class GameObject {

    constructor(x, y, rad, mass, gravitable, collectable, color, visible) {
        this.posX = x;
        this.posY = y;
        this.rad = rad;
        this.gravitable = gravitable;
        this.collectable = collectable;
        this.color = color;
        this.visible = visible;
    }

    draw() {
        // console.log(this.visible);
        if (this.visible === true) {
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.arc(this.posX, this.posY, this.rad, 0, 2 * Math.PI);
            this.ctx.fill();
            // console.log("drawn");
        }
    }

}

export default GameObject;