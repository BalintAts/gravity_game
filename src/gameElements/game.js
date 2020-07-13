import Level from "./level";
import levelsData from "../data/levelsData";
import Player from "./player";

class Game {

    level;
    currentLevelNumber = 0;
    player;

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    start() {
        this.createLevel();
        this.player = new Player(200, 400, this);
        this.currentLevelNumber = 0;
    }

    createLevel() {
        this.level = new Level(this.currentLevelNumber, this);
    }

    checkLevelCompleted() {
        if (this.player.score === this.level.scoreToWin) {
            this.levelCompleted();
            console.log("levelCompleted");
        }
        console.log("checkLevelCompleted");
    }

    levelCompleted() {
        this.currentLevelNumber++;
        this.createLevel();
    }

    gameOver() {
        console.log("GameOver");
    }

}

export default Game;