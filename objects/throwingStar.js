class ThrowingStar {
    constructor(x, y, speed) {
        //sprite, tileXY, spriteID)
        this.x = x;
        this.y = y;
        this.xSpeed = 10 * speed;
        this.ySpeed = -3;
        this.width = 10;
        this.height = 10;
        this.sprite = new Image();
        this.sprite.src = './images/throwingStar.png'
        //this.sprite = sprite;
        //this.tileXY = tileXY;
        //this.spriteID = spriteID;
    }
    update(enemies, GRAVITY) {
        //Enemy collision
    for(let i = 0; i < enemies.length; i++) {
        if(this.x + this.width > enemies[i].x &&
          this.x < enemies[i].x + 32) {
            if (
              this.y + this.height + this.ySpeed > enemies[i].y &&
              this.y + this.ySpeed < enemies[i].y + 32
            ) {
              enemies[i] = ''
            }
          }
      }
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