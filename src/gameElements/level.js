import GravitableObject from "./gravitableObject";
import OtherObject from "./otherObject";

class Level {
    gravitatableObjects;
    otherObjects;

    constructor(leveldata) {
        for (let data of leveldata.gravitableObjectsData) {
            this.gravitatableObjects.push(new GravitableObject(data));
        }
        for (let data of leveldata.otherObjectsData) {
            this.otherObjects.push(new OtherObject(data));
        }
    }
}

export default Level;