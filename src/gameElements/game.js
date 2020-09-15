import Level from "./level";
import levelsData from "../data/levelsData";
import Player from "./player";

class Game {

    user;
    level;
    currentLevelNumber = 0;
    player;

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    submitProgress() {
        // axios magic will go here, using this.user
    }


    start(currentLevelNumber) {
        this.player = new Player(200, 400, this);
        this.changeLevel();
        this.currentLevelNumber = currentLevelNumber;
    }

    changeLevel() {
        this.level = new Level(this.currentLevelNumber, this);
        this.player.posX = 200;
        this.player.posY = 400;
        this.player.horizontalSpeed = 0;
        this.player.verticalSpeed = 0;
        this.player.score = 0;
        this.player.lives = 3;
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
        this.submitProgress();
        this.changeLevel();
    }

    gameOver() {
        console.log("GameOver");
    }
}

export default Game;