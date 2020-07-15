import GravitableObject from "./gravitableObject";
import OtherObject from "./otherObject";
import GameObject from "./gameObject";

import levelsData from "../data/levelsData";

class Level {
    gameObjects = [];
    scoreToWin = 0;
    game;

    constructor(currentLevelNumber, game) {
        this.game = game;
        this.scoreToWin = 0;  //reset required score
        for (let data of levelsData[currentLevelNumber]) {
            this.gameObjects.push(new GameObject(data.x, data.y, data.radius, data.mass, data.gravitable, data.collectable, data.color, data.visible));
            if (data.collectable === true) {
                this.scoreToWin++;  //need to put in the levelData
            }
        }
    }
}

export default Level;