class SpeedPowerup {
    constructor(x, y, size, sprite, startPosition ) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.sprite = sprite;
        this.spriteID = "!";
        this.tileXY = startPosition;
    }
    draw(context) {
        context.drawImage(
            this.sprite,
            this.tileXY.x,
            this.tileXY.y,
            this.tileXY.tileSize,
            this.tileXY.tileSize,
            this.x,
            this.y,
            this.size,
            this.size
        );
    }
    update() {
    }
}

export { SpeedPowerup };