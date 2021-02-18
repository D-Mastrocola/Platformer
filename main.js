import { Player } from "./player.js";
import { World } from "./world.js";
import { NextWorld } from "./nextlevel.js";



let canvas;
let context;
var currentWorld


let gameState;

const GRAVITY = .3;
const FRICTION = .35;

let player;
let nextWorld;

let spritePlayerIdleRight;
let spritePlayerIdleLeft;
let spritePlayerRunRight;
let spritePlayerRunLeft;
let spritePlayerJumpRight;
let spritePlayerJumpLeft;
let spritePlayerFallRight;
let spritePlayerFallLeft;

let worldArray = [];

let tileSheet = document.getElementById("block");

function init() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 512;

    spritePlayerIdleRight = document.getElementById("player-idle-right");
    spritePlayerIdleLeft = document.getElementById("player-idle-left");
    spritePlayerRunRight = document.getElementById("player-run-right");
    spritePlayerRunLeft = document.getElementById("player-run-left");
    spritePlayerJumpRight = document.getElementById("player-jump-right");
    spritePlayerJumpLeft = document.getElementById("player-jump-left");
    spritePlayerFallRight = document.getElementById("player-fall-right");
    spritePlayerFallLeft = document.getElementById("player-fall-left");

    player = new Player(-100, -100, spritePlayerIdleRight, {
        idleRight: spritePlayerIdleRight,
        idleLeft: spritePlayerIdleLeft,
        runRight: spritePlayerRunRight,
        runLeft: spritePlayerRunLeft,
        jumpRight: spritePlayerJumpRight,
        jumpLeft: spritePlayerJumpLeft,
        fallRight: spritePlayerFallRight,
        fallLeft: spritePlayerFallLeft
    });



    tileSheet = document.getElementById("tilesheet");
    worldArray = [
        new World(
            [
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "#", "0", "0", "0", "0", "0", "0", "0", "0", ".1", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", ">"],
                ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
            ]
        ),
        new World(
            [
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", ">", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "2", "1", "1", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "4", "5", "5", "6", ".2", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "4", "5", "5", "1", "1", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "7", "8", "8", "8", "8", "9", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", ".1", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "2", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "7", "9", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["!", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "#", "0", "0", "0", "0", "0"],
                ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
            ]
        ),
        new World(
            [
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", ".4", "0", "0", ">", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "2", "3", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "2", "1", "1", "3", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "7", "8", "8", "9", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "!", "0", "0", ".3", ".3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["1", "1", "1", "1", "1", "1", "1", "1", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["5", "5", "5", "5", "5", "5", "5", "5", "1", "1", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["8", "8", "8", "8", "8", "8", "8", "8", "8", "8", "9", "0", "0", "0", "0", ".2", ".2", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "2", "1", "1", "3", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "2", "1", "5", "5", "6", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "0", "0", ".1", "0", "0", "0", "7", "8", "8", "8", "9", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "0", "0", "2", "1", "1", "1", "3", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
                ["0", "0", "0", "0", "0", "2", "1", "1", "5", "5", "5", "6", "0", "2", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
                ["#", "0", "0", "0", "0", "4", "5", "5", "5", "5", "5", "6", "0", "4", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5", "5"],
                ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
            ]
        )
    ]

    nextWorld = new NextWorld(0, 0, 32, tileSheet, { x: 5 * 32, y: 1 * 32, tileSize: 32 });

    currentWorld = worldArray[0];
    console.log(worldArray)
    currentWorld.loadWorld(currentWorld.objString, player, nextWorld, tileSheet);
    canvas.width = currentWorld.objString[0].length * 32;
    canvas.height = currentWorld.objString.length * 32;
    gameState = "RUNNING";
    window.requestAnimationFrame(gameLoop);
}


function draw(timeStamp) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#8cf";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < currentWorld.objArray.length; i++) {
        for (let j = 0; j < currentWorld.objArray[i].length; j++) {
            if (currentWorld.objArray[i][j] !== 0) {
                currentWorld.objArray[i][j].draw(context, timeStamp);
            }
        }
    }
    player.draw(context, timeStamp);
    nextWorld.draw(context);

    /*//FPS counter
    context.font = "25px Arial";
    context.fillStyle = "#000";
    context.fillText("FPS: " + fps, 10, 30);*/

    //Score display
    context.font = "20px Arial";
    context.fillStyle = "#000";
    context.fillText("Score: " + player.score, canvas.width - 120, 30);
}

function update(timeStamp) {
    if (gameState === "RUNNING") {
        for (let i = 0; i < currentWorld.objArray.length; i++) {
            for (let j = 0; j < currentWorld.objArray[i].length; j++) {
                if (currentWorld.objArray[i][j] !== 0) {
                    currentWorld.objArray[i][j].update(context, timeStamp);
                }
            }
        }
        player.update(GRAVITY, FRICTION, currentWorld, worldArray, nextWorld, tileSheet);
        draw(timeStamp);
    } else if (gameState === "PAUSED") {

    }
}

//---------------------------------
let secondsPassed;
let oldTimeStamp;
let fps;

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

document.addEventListener("keydown", function(e) {
    //left
    if (e.keyCode === 65) {
        player.moveKeys.a = 1;
    }
    //right
    if (e.keyCode === 68) {
        player.moveKeys.d = 1;
    }
    //space
    if (e.keyCode === 32) {
        player.moveKeys.space = 1;
    }
    //esc 
    if (e.keyCode === 27) {
        if (gameState === "RUNNING") {
            gameState = "PAUSED";
            context.fillStyle = "rgba(0, 0, 0, .2)";
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.font = "40px Arial";
            context.fillStyle = "#fff";
            context.fillText("PAUSED", canvas.width / 2 - 90, canvas.height / 2);
        } else {
            gameState = "RUNNING";
        }
    }
});
document.addEventListener("keyup", function(e) {
    if (e.keyCode === 65) {
        player.moveKeys.a = 0;
    }
    if (e.keyCode === 68) {
        player.moveKeys.d = 0;
    }
    if (e.keyCode === 32) {
        player.moveKeys.space = 0;
    }
});

init();