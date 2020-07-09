class GameObject {

    constructor(x, y, rad) {
        this.posX = x;
        this.posY = y;
        this.rad = rad;
    }

    draw() {

        this.ctx.fillStyle = "green";
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.rad, 0, 2 * Math.PI);
        this.ctx.fill();
        // console.log("drawn");
    }

}

export default GameObject;