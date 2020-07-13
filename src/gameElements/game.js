import Level from "./level";
import levelsData from "../data/levelsData";

class Game {

    level;
    currentLevelNumber = 0;
    player;


    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    createLevel() {
        this.level = new Level(this.currentLevelNumber);
    }

    checkLevelCompleted() {
        if (this.player.score === this.level.scoreToWin) {
            this.levelCompleted();
        }
    }

    levelCompleted() {
        this.currentLevelNumber++;
        this.createLevel(this.currentLevelNumber);
    }

    gameOver() {
        console.log("GameOver");
    }

}

export default Game;