import sprite from './assets/images/sprites.png'

export default class Player {
    constructor(game) {
        this.game = game
        this.width = 90
        this.height = 100
        this.x = 50
        this.y = 100

        this.frameX = 0

        this.speedX = 0
        this.speedY = 0
        this.maxSpeed = 10
        this.jumpSpeed = 15

        this.grounded = false

        const img = new Image()
        img.src = sprite
        this.image = img

        this.faceLeft = false
    }

    update(deltaTime) {
        if (this.game.keys.includes('ArrowLeft') && this.x > 0) {
            this.speedX = -this.maxSpeed
            this.faceLeft = true
        } else if (this.game.keys.includes('ArrowRight') && this.x < this.game.width - this.width) {
            this.speedX = this.maxSpeed
            this.faceLeft = false
        } else {
            this.speedX = 0
        }

        if (this.game.keys.includes('ArrowUp') && this.grounded) {
            this.speedY = -this.jumpSpeed
            this.grounded = false
            console.log('jump')
        }

        if (this.grounded) {
            this.speedY = 0
        } else {
            this.speedY += this.game.gravity
        }

        if (this.game.keys.includes('ArrowDown')) {
            this.speedY = this.maxSpeed
        }

        this.x += this.speedX
        this.y += this.speedY
    }

    draw(context) {
        context.fillStyle = '#f00'
        context.fillRect(this.x, this.y, this.width, this.height)
        context.drawImage(this.image, 75,170,115,140,this.x, this.y, this.width, this.height)

        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.fillStyle = 'black'
            context.font = '12px Arial'
            context.fillText(this.frameX, this.x, this.y - 5)
        }
    }
}