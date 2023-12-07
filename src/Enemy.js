import pumpa from './assets/images/Ebbe/enemy_Pumpa.png'

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

        const img = new Image()
        img.src = pumpa
        this.image = img

        this.enemyType = 1;
    }

    update(deltaTime) {
        if (this.grounded) {
            this.speedY = 0
          } else {
            this.speedY += this.game.gravity
        }

        this.x += this.speedX
        this.y += this.speedY
        if (this.x < 0 || this.x + this.width >= 1024) this.speedX *= -1
        if (this.y < 0 || this.y + this.height >= this.game.height) this.speedY *= -1
        if (this.lives <= 0) this.markedForDeletion = true
    }

    draw(context) {
        
        switch (this.enemyType) {
            case 1:
                context.globalAlpha = (this.lives / 25)
                context.drawImage(this.image, 0, this.image.height / 2, this.image.width, this.image.height / 2, this.x, this.y, this.width, this.height)
                context.globalAlpha = (25 - this.lives) * (1.0 / 25.0)
                context.drawImage(this.image, 0, 0, this.image.width, this.image.height / 2, this.x, this.y, this.width, this.height)
                break;
            case 2:
                context.globalAlpha = (this.lives / 25)
                context.drawImage(this.image, 0, this.image.height / 2, this.image.width, this.image.height / 2, this.x, this.y, this.width, this.height)
                context.globalAlpha = (25 - this.lives) * (1.0 / 25.0)
                context.drawImage(this.image, 0, 0, this.image.width, this.image.height / 2, this.x, this.y, this.width, this.height)
                break;
            default:
                context.fillStyle = '#0f0'
                context.fillRect(this.x, this.y, this.width, this.height)
                break;
        }
        context.globalAlpha = 1
        


        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.fillStyle = 'black'
            context.font = '20px Arial'
            context.fillText(this.lives, this.x, this.y - 5)
            context.font = '12px Arial'
            context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
            context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
            context.fillText(`type: ${this.enemyType}`, this.x + 40, this.y - 5)
        }
    }
}