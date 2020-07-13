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
        this.player = new Player(200, 400, this);
        this.createLevel();
        this.currentLevelNumber = 0;

    }

    createLevel() {
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
        this.createLevel();
    }

    gameOver() {
        console.log("GameOver");
    }

}

export default Game;