import Level from "./level";
import levelsData from "../data/levelsData";
import Player from "./player";

class Game {

    user;
    level;
    currentLevelNumber = 0;
    player;
    ctx;

    constructor(width, height, ctx) {
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }

    submitProgress() {
        // axios magic will go here, using this.user
    }


    start() {
        this.player = new Player(200, 400, this);
        this.changeLevel(0);

    }

    changeLevel() {
        this.level = new Level(this.currentLevelNumber, this);
        this.player.posX = 200;
        this.player.posY = 400;
        this.player.horizontalSpeed = 0;
        this.player.verticalSpeed = 0;
        this.player.score = 0;
        this.player.lives = 3;
        // if (this.currentLevelNumber !== 0 && this.ctx) {
        //     this.ctx.clearRect(0, 0, 1000, 1000);
        // }
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
        this.changeLevel(this.currentLevelNumber);
    }

    gameOver() {
        console.log("GameOver");
    }
}

export default Game;