class Game {
    currentLevelNumber = 0;
    level = null;
    player = null;
    hp = 100;

    createLevel = () => {
        console.log("createLevel");
    }
    gameOver = () => {
        console.log("GameOver");
    }
}

export default Game;