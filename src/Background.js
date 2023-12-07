import bgE from "./assets/images/Ebbe/BG.png"
import mgE from "./assets/images/Ebbe/MG.png"
import fgE from "./assets/images/Ebbe/FG-s.png"
import bgJ from './assets/images/joshua/bg.png'
import mgJ from './assets/images/joshua/mg.png'
import fgJ from './assets/images/joshua/fg.png'
import Layer from "./Layer"

export default class Background {
    constructor(game) {
        this.game = game
        this.currentLevel = 0
        this.x = - this.game.width / 2

        this.level = [
            {
                bg: new Layer(game, bgE,0),
                mg: new Layer(game, mgE,10),
                fg: new Layer(game, fgE, this.game.height - 62),
            },
            {
                bg: new Layer(game, bgJ, 0),
                mg: new Layer(game, mgJ, 0),
                fg: new Layer(game, fgJ, 0),
            },
        ]
    }

    update() {
        //console.log(this.x)
        //if (this.game.keys.includes('ArrowLeft') && this.x < 0){
        //    this.x += this.game.player.maxSpeed
        //} else if (this.game.keys.includes('ArrowRight') && this.x > -424){
        //    this.x -= this.game.player.maxSpeed
        //}
        //if (this.x > 0) this.x = 0
        //if (this.x < -424) this.x = -424
    }

    draw(context) {
        this.level[this.currentLevel].bg.draw(context)
        this.level[this.currentLevel].mg.draw(context)
        this.level[this.currentLevel].fg.draw(context)
    }
}