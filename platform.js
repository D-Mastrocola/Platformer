class Platform {
    constructor(x, y, width, height, sprite, startPosition) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.tileXY = startPosition;
    }
    update() {
    }
    draw(context) {
        //context.drawImage(this.sprite, this.x, this.y, this.width, this.height);

        context.drawImage(
            this.sprite,
            this.tileXY.x,
            this.tileXY.y,
            this.tileXY.tileSize,
            this.tileXY.tileSize,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

export {Platform};