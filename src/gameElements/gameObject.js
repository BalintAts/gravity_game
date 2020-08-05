class GameObject {


    constructor(imgSource, x, y, rad, mass, gravitable, collectable, color, visible) {
        this.imgSource = imgSource;
        this.posX = x;
        this.posY = y;
        this.rad = rad;
        this.gravitable = gravitable;
        this.collectable = collectable;
        this.color = color;
        this.visible = true;

        this.mass = mass;
        this.imgSource = imgSource;
    }

    draw(ctx) {
        console.log(this.visible);
        // if (this.visible === true) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.rad, 0, 2 * Math.PI);
        ctx.fill();
        // }
    }

}

export default GameObject;