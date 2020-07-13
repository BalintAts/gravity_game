import Level from "./level";
import levelsData from "../data/levelsData";
import Player from "./player";

class Game {

    level;
    currentLevelNumber = 0;
    player;

    start() {
        this.createLevel();
        this.player = new Player(200, 250, this);
    }


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