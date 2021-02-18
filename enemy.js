class Enemy {
  constructor(x, y, startSpeed, path) {
    this.x = x;
    this.y = y;
    this.path = [path[0] * 32, path[1] * 32];
    this.width = 32;
    this.height = 32;
    this.moveSpeed = 5;
    this.xSpeed = startSpeed * this.moveSpeed;
  }
  checkCollisions(world) {
    //World bounds
    if (this.x + this.xSpeed <= 0) {
      this.x = 0;
      this.xSpeed *= -1;
    }
    if (this.x + this.xSpeed + this.width >= canvas.width) {
      this.x = canvas.width - this.width;
      this.xSpeed *= -1;
    }
    if (this.y + this.height >= canvas.height) {
      this.y = canvas.height - this.height;
      this.ySpeed = 0;
    }
    //Changes direction on path
    if (this.x <= this.path[0]) {
      this.x = this.path[0];
      this.xSpeed *= -1;
    }
    if (this.x >= this.path[1]) {
      this.x = this.path[1];
      this.xSpeed *= -1;
    }
  }
  update(world) {
    this.x += this.xSpeed;
    this.checkCollisions(world);
  }
  draw(context) {
    context.fillStyle = "#ff0000";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export { Enemy };
