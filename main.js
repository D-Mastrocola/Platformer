class Player {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.jumped = false;
        this.jumpSpeed = -7;
        this.jumpMultiplier = 1;
        this.moveSpeed = 5;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.speedMultiplier = 1;
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

        this.boundArray = [];
    }
    setSpeed(GRAVITY) {
        if (moveKeys.a === 1) {
            if (moveKeys.d !== 1) {
                this.xSpeed = -this.moveSpeed * this.speedMultiplier;
                this.dir = "left";
            } else {
                this.xSpeed = 0;
            }
        } else if (moveKeys.d === 1) {
            if (moveKeys.a !== 1) {
                this.xSpeed = this.moveSpeed * this.speedMultiplier;
                this.dir = "right";
            } else {
                this.xSpeed = 0;
            }
        } else {
            this.xSpeed = 0;
        }
        if (moveKeys.space === 1) {
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
                    this.sprite = spritePlayerFallRight;
                } else {
                    //Change to jump sprite
                    this.sprite = spritePlayerJumpRight;
                }

            } else {
                if (this.xSpeed > 0) {
                    //Change to run sprite
                    this.sprite = spritePlayerRunRight;
                } else if (this.dir === "right") {
                    this.sprite = spritePlayerIdleRight;
                }
            }
        } else if (this.dir === "left") {
            if (this.jumped === true) {
                if (this.ySpeed > 0) {
                    //Change to fall sprite
                    this.sprite = spritePlayerFallLeft;
                } else if (this.ySpeed < 0) {
                    //Change to jump sprite
                    this.sprite = spritePlayerJumpLeft;
                }
            } else {
                if (this.xSpeed < 0) {
                    this.sprite = spritePlayerRunLeft;
                } else if (this.dir === "left") {
                    this.sprite = spritePlayerIdleLeft;
                }
            }
        }
        this.ySpeed += GRAVITY;
    }
    checkCollisions() {
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
                    i < world0.objArray.length &&
                    j < world0.objArray[i].length
                ) {
                    if (world0.objArray[i][j] !== 0) {
                        if (
                            this.x + this.width + this.xSpeed > world0.objArray[i][j].x &&
                            this.x + this.xSpeed < world0.objArray[i][j].x + this.width
                        ) {
                            if (
                                this.y + this.height + this.ySpeed > world0.objArray[i][j].y &&
                                this.y + this.ySpeed < world0.objArray[i][j].y + this.height
                            ) {
                                //Checks to see if is the speed powerup
                                if(world0.objArray[i][j].spriteID === "!") {
                                    score += 10
                                    this.speedMultiplier = 1.4;
                                    this.jumpMultiplier = 1.6;
                                    world0.objArray[i][j] = 0;
                                    continue;
                                }
                                if (this.x + this.width > world0.objArray[i][j].x &&
                                    this.x < world0.objArray[i][j].x + this.width) {
                                    if (this.ySpeed > 0) {
                                        this.y = world0.objArray[i][j].y - this.height;
                                        this.jumped = false;
                                    } else {
                                        this.y = world0.objArray[i][j].y + this.height;
                                    }
                                    this.ySpeed = 0;
                                } else if (this.y + this.height > world0.objArray[i][j].y &&
                                    this.y < world0.objArray[i][j].y + this.height) {
                                    if (this.xSpeed > 0) {
                                        this.x = world0.objArray[i][j].x - this.width;
                                    } else {
                                        this.x = world0.objArray[i][j].x + this.width;
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
    update(GRAVITY) {
        this.setSpeed(GRAVITY);
        this.checkCollisions();
        this.lastPosition.x = this.x;
        this.lastPosition.y = this.y;
        this.x += this.xSpeed;
        this.y += this.ySpeed;

    }
    draw(timeStamp) {
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

class SpeedPowerup {
    constructor(x, y, size, sprite) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.sprite = sprite;
        this.spriteID = "!";
        this.tileXY = getTileSprite(this.spriteID);
    }
    draw() {
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
class World {
    constructor(objString) {
        this.objString = objString;
        this.objSize = 32;
        this.objArray = [];
        this.loadWorld(this.objString);
    }
    loadWorld(str) {
        this.objString = str;
        for (let i = 0; i < this.objString.length; i++) {
            this.objArray.push([]);
            for (let j = 0; j < this.objString[i].length; j++) {
                if (this.objString[i][j] === "0") {
                    this.objArray[i].push(0);
                } else if (this.objString[i][j] === "#") {
                    player.x = j * this.objSize;
                    player.y = i * this.objSize;
                    this.objArray[i].push(0);
                } else if (this.objString[i][j] === "1") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        1
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "2") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        2
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "3") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        3
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "4") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        4
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "5") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        5
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "6") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        6
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "7") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        7
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "8") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        8
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "9") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        9
                    );
                    this.objArray[i].push(platform);
                }
                else if(this.objString[i][j] === "!") {
                    let speedPowerup = new SpeedPowerup(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        tileSheet,
                    );
                    this.objArray[i].push(speedPowerup);
                }
            }
        }
        console.log(this.objArray);
    }
}

class Platform {
    constructor(x, y, width, height, sprite, spriteIndex) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.spriteIndex = spriteIndex;
        this.tileXY = getTileSprite(this.spriteIndex);
    }
    update() {
    }
    draw() {
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

let canvas;
let context;
let world0;

let gameState;

const GRAVITY = .3;
const FRICTION = 0.1;

let player;
let score;

let spritePlayerIdleRight;
let spritePlayerIdleLeft;
let spritePlayerRunRight;
let spritePlayerRunLeft;
let spritePlayerJumpRight;
let spritePlayerJumpLeft;
let spritePlayerFallRight;
let spritePlayerFallLeft;

let tileSheet = document.getElementById("block");

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 512;

    player = new Player(-100, -100, spritePlayerIdleRight);
    score = 0;
    spritePlayerIdleRight = document.getElementById("player-idle-right");
    spritePlayerIdleLeft = document.getElementById("player-idle-left");
    spritePlayerRunRight = document.getElementById("player-run-right");
    spritePlayerRunLeft = document.getElementById("player-run-left");
    spritePlayerJumpRight = document.getElementById("player-jump-right");
    spritePlayerJumpLeft = document.getElementById("player-jump-left");
    spritePlayerFallRight = document.getElementById("player-fall-right");
    spritePlayerFallLeft = document.getElementById("player-fall-left");

    tileSheet = document.getElementById("tilesheet");
    world0 = new World(
        [
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "!", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["1", "1", "1", "1", "1", "1", "1", "1", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["5", "5", "5", "5", "5", "5", "5", "5", "1", "1", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "9", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "2", "1", "1", "3", "0", "0", "0", "0", "0", "0", "0"],
            ["#", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "2", "1", "5", "5", "6", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "7", "8", "8", "8", "9", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "0", "0", "2", "1", "1", "1", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
            ["0", "0", "0", "0", "0", "2", "1", "1", "5", "5", "5", "6", "0", "2", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
            ["0", "0", "0", "0", "0", "4", "5", "5", "5", "5", "5", "6", "0", "4", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5"],
            ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
        ]
    );
    
    canvas.width = world0.objString[0].length * 32;
    canvas.height = world0.objString.length * 32;
    gameState = "RUNNING";
    window.requestAnimationFrame(gameLoop);
}


function draw(timeStamp) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#8cf";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < world0.objArray.length; i++) {
        for (let j = 0; j < world0.objArray[i].length; j++) {
            if (world0.objArray[i][j] !== 0) {
                world0.objArray[i][j].draw(timeStamp);
            }
        }
    }
    player.draw(timeStamp);

    /*//FPS counter
    context.font = "25px Arial";
    context.fillStyle = "#000";
    context.fillText("FPS: " + fps, 10, 30);*/

    //Score display
    context.font = "20px Arial";
    context.fillStyle = "#000";
    context.fillText("Score: " + score, canvas.width - 100, 30);
}

function update(timeStamp) {
    if(gameState === "RUNNING"){
        for (let i = 0; i < world0.objArray.length; i++) {
            for (let j = 0; j < world0.objArray[i].length; j++) {
                if (world0.objArray[i][j] !== 0) {}
            }
        }
        player.update(GRAVITY, FRICTION);
        draw(timeStamp);
    }
    else if (gameState === "PAUSED")
    {
        
    }    
}

//---------------------------------
let secondsPassed;
let oldTimeStamp;
let fps;
let moveKeys = {
    a: 0,
    d: 0,
    space: 0,
};

function gameLoop(timeStamp) {
    // Calculate the number of seconds passed since the last frame
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Calculate fps
    fps = Math.round(1 / secondsPassed);
    // Draw number to the screen

    // Perform the drawing operation
    update(timeStamp);

    // The loop function has reached it's end. Keep requesting new frames
    window.requestAnimationFrame(gameLoop);
}

function getTileSprite(spriteID) {
    let startPosition = {
        x: 0,
        y: 0,
        tileSize: 32,
    };

    if (spriteID === 1) {
        startPosition.x = 1 * startPosition.tileSize;
        startPosition.y = 0 * startPosition.tileSize;
    } else if (spriteID === 2) {
        startPosition.x = 0 * startPosition.tileSize;
        startPosition.y = 0 * startPosition.tileSize;
    } else if (spriteID === 3) {
        startPosition.x = 2 * startPosition.tileSize;
        startPosition.y = 0 * startPosition.tileSize;
    } else if (spriteID === 4) {
        startPosition.x = 0 * startPosition.tileSize;
        startPosition.y = 1 * startPosition.tileSize;
    } else if (spriteID === 5) {
        startPosition.x = 1 * startPosition.tileSize;
        startPosition.y = 1 * startPosition.tileSize;
    } else if (spriteID === 6) {
        startPosition.x = 2 * startPosition.tileSize;
        startPosition.y = 1 * startPosition.tileSize;
    } else if (spriteID === 4) {
        startPosition.x = 0 * startPosition.tileSize;
        startPosition.y = 1 * startPosition.tileSize;
    } else if (spriteID === 5) {
        startPosition.x = 1 * startPosition.tileSize;
        startPosition.y = 1 * startPosition.tileSize;
    } else if (spriteID === 6) {
        startPosition.x = 2 * startPosition.tileSize;
        startPosition.y = 1 * startPosition.tileSize;
    } else if (spriteID === 7) {
        startPosition.x = 0 * startPosition.tileSize;
        startPosition.y = 2 * startPosition.tileSize;
    } else if (spriteID === 8) {
        startPosition.x = 1 * startPosition.tileSize;
        startPosition.y = 2 * startPosition.tileSize;
    } else if (spriteID === 9) {
        startPosition.x = 2 * startPosition.tileSize;
        startPosition.y = 2 * startPosition.tileSize;
    } else if (spriteID === "!") {
        startPosition.x = 1 * startPosition.tileSize;
        startPosition.y = 9 * startPosition.tileSize;
    }
    return startPosition;
}

document.addEventListener("keydown", function(e) {
    //left
    if (e.keyCode === 65) {
        moveKeys.a = 1;
    }
    //right
    if (e.keyCode === 68) {
        moveKeys.d = 1;
    }
    //space
    if (e.keyCode === 32) {
        moveKeys.space = 1;
    }
    //esc 
    if(e.keyCode === 27) {
        if(gameState === "RUNNING") {
            gameState = "PAUSED";
            context.fillStyle = "rgba(0, 0, 0, .2)";
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
        else {
            gameState = "RUNNING";
        }
    }
});
document.addEventListener("keyup", function(e) {
    if (e.keyCode === 65) {
        moveKeys.a = 0;
    }
    if (e.keyCode === 68) {
        moveKeys.d = 0;
    }
    if (e.keyCode === 32) {
        moveKeys.space = 0;
    }
});

init();