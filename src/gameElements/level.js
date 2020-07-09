import GravitableObject from "./gravitableObject";
import OtherObject from "./otherObject";
import GameObject from "./gameObject";

import levelsData from "../data/levelsData";

class Level {
    gameObjects = [];

    constructor(currentLevelNumber) {
        for (let data of levelsData[currentLevelNumber]) {
            this.gameObjects.push(new GameObject(data.x, data.y, data.radius, data.mass, data.gravitable, data.collectable, data.color, data.visible));
        }
    }
}

export default Level;