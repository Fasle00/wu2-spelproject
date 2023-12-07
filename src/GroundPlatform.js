import Platform from './Platform.js'

export default class GroundPlatform extends Platform {
    constructor(game, y) {
        super(game, 0, y, 1024, 320)
    }

    draw(context) {
        if (this.game.debug) {
            context.fillStyle = 'black'
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.font = '12px Arial'
            context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
            context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
        }
    }
}