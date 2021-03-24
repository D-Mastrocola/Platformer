class ThrowingStar {
    constructor(x, y, speed) {
        //sprite, tileXY, spriteID)
        this.x = x;
        this.y = y;
        this.xSpeed = 8 * speed;
        this.ySpeed = -8;
        this.width = 10;
        this.height = 10;
        this.sprite = new Image();
        this.sprite.src = './images/throwingStar.png'
        //this.sprite = sprite;
        //this.tileXY = tileXY;
        //this.spriteID = spriteID;
    }
    update(GRAVITY) {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.ySpeed += GRAVITY;
    }
    draw(context) {
        /*context.drawImage(
            this.sprite,
            this.x,
            this.y
        );*/
        context.fillStyle = '#000',
        context.fillRect(this.x, this.y, this.width, this.height);

    }
}
export { ThrowingStar };