class Enemy {
  constructor(x, y, startSpeed) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.moveSpeed = 5;
    this.xSpeed = startSpeed * this.moveSpeed;
  }
  checkCollisions() {
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
  }
  update() {
    this.x += this.xSpeed;
    this.checkCollisions();
  }
  draw(context) {
    context.fillStyle = "#ff0000";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export { Enemy };
