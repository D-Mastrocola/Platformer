class Key {
    constructor(x, y, size, sprite, tileXY, spriteID) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.sprite = sprite;
        this.tileXY = tileXY;
        this.spriteID = spriteID;
    }
    update() {
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
}
export { Key };