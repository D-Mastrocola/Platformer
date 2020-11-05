export default class World {
  constructor(objString) {
    this.objString = objString;
    this.objSize = 32;
    this.objArray = [];
    console.log(this.objString);
    this.loadWorld(this.objString);
  }
  loadWorld(str) {
    this.objString = str;
    console.log(this.objString);
    for(let i = 0; i < this.objString.length; i++) {
      for(let j = 0; j < this.objString[i].length; j++) {
        if(this.objString[i][j] === "0")  {
          
          continue;
        } else if(this.objString[i][j] === "#") {
          let player = new Player(j * this.objSize, i * this.objSize);
          this.objArray.splice(0, 0, player);
          console.log(this.objArray);
          
        } else if(this.objString[i][j] === "1") {
          let platform = new Platform(j * this.objSize, i * this.objSize, this.objSize, this.objSize);
          this.objArray.push(platform);
        }
      }
    }
    console.log(this.objArray);
  }
}