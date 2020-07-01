class Game {
    currentLevelNumber = 0;
    level;
    player;
    hp = 100;

    createLevel = () => {
        console.log("createLevel");
    }

    gameOver = () => {
        console.log("GameOver");
    }

    tick = () => {

    }
}

export default Game;