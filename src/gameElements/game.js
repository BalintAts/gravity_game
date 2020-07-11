import Level from "./level";
import levelsData from "../data/levelsData";

class Game {

    level;
    currentLevelNumber = 0;
    hp = 100;

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    createLevel() {
        this.level = new Level(this.currentLevelNumber);
    }

    gameOver() {
        console.log("GameOver");
    }

}

export default Game;