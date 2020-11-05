export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.jumped = false;
    this.jumpSpeed = -18;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.moveKeys = {
      a: 0,
      d: 0,
      space: 0,
    };
  }
  setSpeed(GRAVITY) {
    if (this.moveKeys.a === 1) {
      if (this.moveKeys.d !== 1) {
        this.xSpeed = -6;
        console.log("left");
      } else {
        this.xSpeed = 0;
      }
    } else if (this.moveKeys.d === 1) {
      if (this.moveKeys.a !== 1) {
        this.xSpeed = 6;
        console.log("r`ight");
      } else {
        this.xSpeed = 0;
      }
    } else {
      this.xSpeed = 0;
    }
    if (this.moveKeys.space === 1) {
      if(this.jumped === false) {
        this.ySpeed = this.jumpSpeed;
        this.jumped = true;
      }
    }
    this.ySpeed += GRAVITY;
  }
  checkCollisions() {
    if(this.x <= 0) {
      this.x = 0;
    }
    if(this.x + this.width >= canvas.width) {
      this.x = canvas.width - this.width;
    }
    if(this.y + this.height >= canvas.height) {
      this.y = canvas.height - this.height;
      this.ySpeed = 0;
      this.jumped = false;
    }

  }
  update(GRAVITY) {
    console.log(this.moveKeys);
    this.setSpeed(GRAVITY);
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.checkCollisions();
  }
  draw(context) {
    context.fillStyle = "#000";
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}