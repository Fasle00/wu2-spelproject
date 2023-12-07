import Platform from "./Platform";
import GroundPlatform from "./GroundPlatform";
 
export default class Levels {
    constructor(game) {
        this.game = game

        this.platforms = []
    }

    draw(context) {
        this.platforms.forEach(platform => {
            platform.draw(context)
        });
    }

    addPlatform(x, y, width, height){
        this.platforms.push(new Platform(this.game, x, y, width, height))
    }

    addGroundPlatform(y) {
        this.platforms.push(new GroundPlatform(this.game, y))
    }
}