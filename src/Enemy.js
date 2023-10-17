export default class Enemy {
    constructor(game) {
        this.game = game
        this.x = 0
        this.y = 0
        this.speedX = 0
        this.speedY = 0
        this.markedForDeletion = false
        this.lives = 1
        this.grounded = false
    }

    update(deltaTime) {
        if (this.grounded) {
            this.speedY = 0
          } else {
            this.speedY += this.game.gravity
        }

        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x + this.width >= this.game.width) this.speedX *= -1
        if (this.y < 0 || this.y + this.height >= this.game.height) this.speedY *= -1
        if (this.lives <= 0) this.markedForDeletion = true
    }

    draw(context) {
        context.fillStyle = '#0f0'
        context.fillRect(this.x, this.y, this.width, this.height)

        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.fillStyle = 'black'
            context.font = '20px Arial'
            context.fillText(this.lives, this.x, this.y - 5)
            context.font = '12px Arial'
            context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
            context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
        }
    }
}