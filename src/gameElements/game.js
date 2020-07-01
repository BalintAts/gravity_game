class Game() {
    currentLevelNumber = 0;
    level = null;
    player = null;
    hp = 100;

    this.createLevel = () => {
        console.log("createLevel");
    }
    this.gameOver = () => {
        console.log("GameOver");
    }
}

export default Game;