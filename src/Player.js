export default class Player {
    constructor(game) {
        this.game = game
        this.width = 32
        this.height = 64
        this.x = 50
        this.y = 100

        this.frameX = 0

        this.speedX = 0
        this.speedY = 0
        this.maxSpeed = 10

        this.faceLeft = false
    }

    update(deltaTime) {
        if (this.game.keys.includes('ArrowLeft')) {
            this.speedX = -this.maxSpeed
            this.faceLeft = true
        } else if (this.game.keys.includes('ArrowRight')) {
            this.speedX = this.maxSpeed
            this.faceLeft = false
        } else {
            this.speedX = 0
        }

        if (this.game.keys.includes('ArrowUp')) {
            this.speedY = -this.maxSpeed
        } else if (this.game.keys.includes('ArrowDown')) {
            this.speedY = this.maxSpeed
        } else {
            this.speedY = 0
        }

        this.x += this.speedX
        this.y += this.speedY
    }

    draw(context) {
        context.fillStyle = '#f00'
        context.fillRect(this.x, this.y, this.width, this.height)

        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.fillStyle = 'black'
            context.font = '12px Arial'
            context.fillText(this.frameX, this.x, this.y - 5)
        }
    }
}