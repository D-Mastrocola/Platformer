class ThrowingStar {
    constructor(x, y, speed) {
        //sprite, tileXY, spriteID)
        this.x = x;
        this.y = y;
        this.xSpeed = 8 * speed;
        this.width = 10;
        this.height = 5;
        this.sprite = new Image();
        this.sprite.src = './images/throwingStar.png'
        //this.sprite = sprite;
        //this.tileXY = tileXY;
        //this.spriteID = spriteID;
    }
    update() {
        this.x += this.xSpeed;
    }
    draw(context) {
        context.drawImage(
            this.sprite,
            this.x,
            this.y
        );
    }
}
export { ThrowingStar };