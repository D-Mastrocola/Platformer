import { ThrowingStar } from "./throwingStar.js";

class Player {
  constructor(x, y, sprite, sprites) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.jumped = false;
    this.jumpSpeed = -7;
    this.jumpMultiplier = 1;
    this.speedMultiplier = 1;
    this.moveSpeed = 5;
    this.moveKeys = {
      a: 0,
      d: 0,
      space: 0,
      shift: 0,
    };
    this.timers = {
      jumpPowerTime: {
        start: 0,
        length: 20_000,
      },
      throwTime: {
        start: 0,
        length: 500,
      },
    };
    this.xAcceleration = 1.5;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.sprites = sprites;
    this.sprite = sprite;
    this.frame = 0;
    this.frameCount = 11;
    this.lastFrameTime = 0;
    this.deltaTime = 0;
    this.dir = "right";
    this.lastPosition = {
      x: 0,
      y: 0,
    };
    this.thrownStars = [];
    this.score = 0;
    this.hasKey = false;
    this.boundArray = [];
  }
  setSpeed(GRAVITY, FRICTION) {
    if (this.moveKeys.a === 1) {
      if (this.moveKeys.d !== 1) {
        this.xSpeed -= this.xAcceleration;
        this.dir = "left";
        if (this.xSpeed < -this.moveSpeed * this.speedMultiplier) {
          this.xSpeed = -this.moveSpeed * this.speedMultiplier;
        }
      }
    } else if (this.moveKeys.d === 1) {
      if (this.moveKeys.a !== 1) {
        this.xSpeed += this.xAcceleration;
        this.dir = "right";
        if (this.xSpeed > this.moveSpeed * this.speedMultiplier) {
          this.xSpeed = this.moveSpeed * this.speedMultiplier;
        }
      }
    }
    if (this.moveKeys.space === 1) {
      if (this.jumped === false) {
        this.ySpeed = this.jumpSpeed * this.jumpMultiplier;
        this.jumped = true;
        this.frame = 0;
      }
    }

    if (this.dir === "right") {
      //if in the air make the sprite falling or jumping
      if (this.jumped === true) {
        if (this.ySpeed > 0) {
          //Change to fall sprite
          this.sprite = this.sprites.fallRight;
        } else {
          //Change to jump sprite
          this.sprite = this.sprites.jumpRight;
        }
      } else {
        if (this.xSpeed > 0) {
          //Change to run sprite
          this.sprite = this.sprites.runRight;
        } else if (this.dir === "right") {
          this.sprite = this.sprites.idleRight;
        }
      }
    } else if (this.dir === "left") {
      if (this.jumped === true) {
        if (this.ySpeed > 0) {
          //Change to fall sprite
          this.sprite = this.sprites.fallLeft;
        } else if (this.ySpeed < 0) {
          //Change to jump sprite
          this.sprite = this.sprites.jumpLeft;
        }
      } else {
        if (this.xSpeed < 0) {
          this.sprite = this.sprites.runLeft;
        } else if (this.dir === "left") {
          this.sprite = this.sprites.idleLeft;
        }
      }
    }
    this.ySpeed += GRAVITY;
    if (this.xSpeed > 0 && this.moveKeys.d !== 1) {
      this.xSpeed -= FRICTION;
      if (this.xSpeed < 0) this.xSpeed = 0;
    } else if (this.xSpeed < 0 && this.moveKeys.a !== 1) {
      this.xSpeed += FRICTION;
      if (this.xSpeed > 0) this.xSpeed = 0;
    }
  }
  checkCollisions(world, worldArray, nextLevel, tileSheet, setGameState) {
    //World bounds
    if (this.x + this.xSpeed <= 0) {
      this.x = 0;
      this.xSpeed = 0;
    }
    if (this.x + this.xSpeed + this.width >= canvas.width) {
      this.x = canvas.width - this.width;
      this.xSpeed = 0;
    }
    if (this.y + this.height >= canvas.height) {
      this.y = canvas.height - this.height;
      this.ySpeed = 0;
      this.jumped = false;
    }
    for (
      let i = Math.round(this.y / this.height) - 2;
      i <= Math.round(this.y / this.height) + 2;
      i++
    ) {
      for (
        let j = Math.round(this.x / this.width) - 2;
        j <= Math.round(this.x / this.width) + 2;
        j++
      ) {
        if (
          i >= 0 &&
          j >= 0 &&
          i < world.objArray.length &&
          j < world.objArray[i].length
        ) {
          if (world.objArray[i][j] !== 0) {
            if (
              this.x + this.width + this.xSpeed > world.objArray[i][j].x &&
              this.x + this.xSpeed < world.objArray[i][j].x + this.width
            ) {
              if (
                this.y + this.height + this.ySpeed > world.objArray[i][j].y &&
                this.y + this.ySpeed < world.objArray[i][j].y + this.height
              ) {
                //Checks to see if is the speed powerup
                if (world.objArray[i][j].spriteID === "!") {
                  this.jumpMultiplier = 1.6;
                  this.timers.jumpPowerTime.start = Date.now();
                  world.objArray[i][j] = 0;
                  continue;
                } else if (world.objArray[i][j].spriteID === ">") {
                  if (this.hasKey) {
                    nextLevel.nextWorld(
                      world,
                      worldArray,
                      this,
                      tileSheet,
                      setGameState
                    );
                  }
                  continue;
                } else if (
                  world.objArray[i][j].spriteID === ".1" ||
                  world.objArray[i][j].spriteID === ".2" ||
                  world.objArray[i][j].spriteID === ".3" ||
                  world.objArray[i][j].spriteID === ".4"
                ) {
                  this.score += world.objArray[i][j].score;
                  world.objArray[i][j] = 0;
                  continue;
                } else if (world.objArray[i][j].spriteID === "k") {
                  this.hasKey = true;
                  world.objArray[i][j] = 0;
                  continue;
                }
                if (
                  this.x + this.width > world.objArray[i][j].x &&
                  this.x < world.objArray[i][j].x + this.width
                ) {
                  if (this.ySpeed > 0) {
                    this.y = world.objArray[i][j].y - this.height;
                    this.jumped = false;
                  } else {
                    this.y = world.objArray[i][j].y + this.height;
                  }
                  this.ySpeed = 0;
                } else if (
                  this.y + this.height > world.objArray[i][j].y &&
                  this.y < world.objArray[i][j].y + this.height
                ) {
                  if (this.xSpeed > 0) {
                    this.x = world.objArray[i][j].x - this.width;
                  } else {
                    this.x = world.objArray[i][j].x + this.width;
                  }
                  this.xSpeed = 0;
                }
              }
            }
          }
        }
      }
    }
  }
  throwStar() {
    if (this.moveKeys.shift === 1 && Date.now() - this.timers.throwTime.start  > this.timers.throwTime.length) {
      
      this.timers.throwTime.start = Date.now();
      let star;
      if (this.dir === "right") {
        star = new ThrowingStar(
          this.x + this.width + this.xSpeed,
          this.y + this.height / 2,
          1
        );
      } else {
        star = new ThrowingStar(this.x + this.xSpeed, this.y + this.height / 2, -1);
      }
      this.thrownStars.push(star);
    }
  }
  update(
    GRAVITY,
    FRICTION,
    world,
    worldArray,
    nextWorld,
    tileSheet,
    setGameState
  ) {
    this.setSpeed(GRAVITY, FRICTION);
    this.checkCollisions(world, worldArray, nextWorld, tileSheet, setGameState);
    this.lastPosition.x = this.x;
    this.lastPosition.y = this.y;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.throwStar();
    this.thrownStars.forEach((e) => {
      e.update(GRAVITY);
    });
    if (
      Date.now() - this.timers.jumpPowerTime.start >
      this.timers.jumpPowerTime.length
    ) {
      this.jumpMultiplier = 1;
    }
  }
  draw(context, timeStamp) {
    this.deltaTime = timeStamp - this.lastFrameTime;
    context.drawImage(
      this.sprite,
      this.frame * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    if (this.deltaTime > 70) {
      if (this.jumped === false) this.animateSprite();
      this.lastFrameTime = timeStamp;
      this.deltaTime = 0;
    }
    this.thrownStars.forEach((e) => {
      e.draw(context);
    });
    if (
      Date.now() - this.timers.jumpPowerTime.start <
      this.timers.jumpPowerTime.length
    ) {
      let timer = Math.round(
        (this.timers.jumpPowerTime.start +
          this.timers.jumpPowerTime.length -
          Date.now()) /
          1000
      );
      context.font = "40px Arial";
      context.fillStyle = "#fd0";
      context.fillText("Boost: " + timer, 10, context.canvas.height - 20);
    }
  }
  animateSprite() {
    this.frame++;
    if (this.frame >= this.frameCount) {
      this.frame = 0;
    }
  }
  reset() {
    this.speedMultiplier = 1;
    this.jumpMultiplier = 1;
    this.hasKey = false;
    this.thrownStars = [];
    this.timers = {
      jumpPowerTime: {
        start: 0,
        length: 20_000,
      },
      throwTime: {
        start: 0,
        length: 500,
      },
    };
  }
}
export { Player };
