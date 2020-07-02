import Level from "./level";
import levelData from "../data/levelsData";

class Game {
    currentLevelNumber = 0;
    level;
    player;
    hp = 100;

    constructor() {
        console.log("Game created");
    }

    createLevel() {
        this.level = new Level(levelData[this.currentLevelNumber]);
    }

    gameOver() {
        console.log("GameOver");
    }

    tick() {

    }

}

export default Game;