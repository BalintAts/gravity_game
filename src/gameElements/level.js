import GravitableObject from "./gravitableObject";
import OtherObject from "./otherObject";
import levelsData from "../data/levelsData";

class Level {
    gravitatableObjects;
    otherObjects;

    constructor() {
        for (let data of levelsData.gravitableObjectsData) {
            this.gravitatableObjects.push(new GravitableObject(data));
        }
        for (let data of levelsData.otherObjectsData) {
            this.otherObjects.push(new OtherObject(data));
        }
    }
}

export default Level;