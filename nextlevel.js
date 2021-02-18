class NextWorld {
  constructor(x, y, size, sprite, tileXY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.levelIndex = 0;
    this.spriteID = ">";
    this.sprite = sprite;
    this.tileXY = tileXY;
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
  update() {}
  nextWorld(world, worldArray, player, tileSheet, setGameState) {
    this.levelIndex++;
    if (this.levelIndex >= worldArray.length) {
      setGameState("COMPLETE");
    } else {
      world.loadWorld(
        worldArray[this.levelIndex].objString,
        player,
        this,
        tileSheet
      );
      player.speedMultiplier = 1;
      player.jumpMultiplier = 1;
      console.log(world.objArray);
    }
  }
}
export { NextWorld };
