class GameObject {


    constructor(x, y, rad, mass, gravitable, collectable, color, visible) {
        this.posX = x;
        this.posY = y;
        this.rad = rad;
        this.gravitable = gravitable;
        this.collectable = collectable;
        this.color = color;
        this.visible = visible;
        this.mass = mass;
    }

    draw(ctx) {
        if (this.visible === true) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.posX, this.posY, this.rad, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

}

export default GameObject;