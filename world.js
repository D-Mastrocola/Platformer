import {SpeedPowerup} from "./speedpowerup.js"
import {Platform} from "./platform.js";
import { NextWorld } from "./nextlevel.js";

class World {
    constructor(objString) {
        this.objString = objString;
        this.objSize = 32;
        this.objArray = [];
    }
    loadWorld(str, player, nextWorld, tileSheet) {
        this.objString = str;
        this.objArray = [];
        for (let i = 0; i < this.objString.length; i++) {
            this.objArray.push([]);
            for (let j = 0; j < this.objString[i].length; j++) {
                if (this.objString[i][j] === "0") {
                    this.objArray[i].push(0);
                } else if (this.objString[i][j] === "#") {
                    player.x = j * this.objSize;
                    player.y = i * this.objSize;
                    this.objArray[i].push(0);
                }
                else if (this.objString[i][j] === ">") {
                    nextWorld.x = j * this.objSize;
                    nextWorld.y = i * this.objSize;
                    this.objArray[i].push(nextWorld);
                } else if (this.objString[i][j] === "1") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        getTileSprite(1)
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "2") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        getTileSprite(2)
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "3") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        getTileSprite(3)
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "4") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        getTileSprite(4)
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "5") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        getTileSprite(5)
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "6") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        getTileSprite(6)
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "7") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        getTileSprite(7)
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "8") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        getTileSprite(8)
                    );
                    this.objArray[i].push(platform);
                } else if (this.objString[i][j] === "9") {
                    let platform = new Platform(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        this.objSize,
                        tileSheet,
                        getTileSprite(9)
                    );
                    this.objArray[i].push(platform);
                }
                else if(this.objString[i][j] === "!") {
                    let speedPowerup = new SpeedPowerup(
                        j * this.objSize,
                        i * this.objSize,
                        this.objSize,
                        tileSheet,
                        getTileSprite("!")
                    );
                    this.objArray[i].push(speedPowerup);
                }
            }
        }
        console.log(this.objArray);
    }
}

function getTileSprite(spriteID) {
    let startPosition = {
        x: 0,
        y: 0,
        tileSize: 32
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
export {World};