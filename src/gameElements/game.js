import Level from "./level";
import levelsData from "../data/levelsData";

class Game {

    level;
    currentLevelNumber = 0;
    hp = 100;

    constructor() {
        console.log("Game created");
    }

    createLevel() {
        this.level = new Level(this.currentLevelNumber);
    }

    gameOver() {
        console.log("GameOver");
    }

}

export default Game;