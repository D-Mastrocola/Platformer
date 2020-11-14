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
        };
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

        this.score = 0;

        this.boundArray = [];
    }
    setSpeed(GRAVITY) {
        if (this.moveKeys.a === 1) {
            if (this.moveKeys.d !== 1) {
                this.xSpeed = -this.moveSpeed * this.speedMultiplier;
                this.dir = "left";
            } else {
                this.xSpeed = 0;
            }
        } else if (this.moveKeys.d === 1) {
            if (this.moveKeys.a !== 1) {
                this.xSpeed = this.moveSpeed * this.speedMultiplier;
                this.dir = "right";
            } else {
                this.xSpeed = 0;
            }
        } else {
            this.xSpeed = 0;
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
    }
    checkCollisions(world, worldArray, nextLevel, tileSheet) {
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
            let i = Math.round(this.y / this.height) - 2; i <= Math.round(this.y / this.height) + 2; i++
        ) {
            for (
                let j = Math.round(this.x / this.width) - 2; j <= Math.round(this.x / this.width) + 2; j++
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
                                    world.objArray[i][j] = 0;
                                    continue;
                                } else if (world.objArray[i][j].spriteID === ">") {
                                    nextLevel.nextWorld(world, worldArray, this, tileSheet);
                                    continue;
                                } else if (world.objArray[i][j].spriteID === ".1" || world.objArray[i][j].spriteID === ".2" || world.objArray[i][j].spriteID === ".3" || world.objArray[i][j].spriteID === ".4") {
                                    this.score += world.objArray[i][j].score;
                                    world.objArray[i][j] = 0;
                                    continue;
                                }
                                if (this.x + this.width > world.objArray[i][j].x &&
                                    this.x < world.objArray[i][j].x + this.width) {
                                    if (this.ySpeed > 0) {
                                        this.y = world.objArray[i][j].y - this.height;
                                        this.jumped = false;
                                    } else {
                                        this.y = world.objArray[i][j].y + this.height;
                                    }
                                    this.ySpeed = 0;
                                } else if (this.y + this.height > world.objArray[i][j].y &&
                                    this.y < world.objArray[i][j].y + this.height) {
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
    update(GRAVITY, world, worldArray, nextWorld, tileSheet) {
        this.setSpeed(GRAVITY);
        this.checkCollisions(world, worldArray, nextWorld, tileSheet);
        this.lastPosition.x = this.x;
        this.lastPosition.y = this.y;
        this.x += this.xSpeed;
        this.y += this.ySpeed;

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
    }
    animateSprite() {
        this.frame++;
        if (this.frame >= this.frameCount) {
            this.frame = 0;
        }
    }
}
export { Player };