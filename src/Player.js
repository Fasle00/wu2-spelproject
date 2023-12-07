import playerS from './assets/images/Ebbe/template player -- Ljus.png'

export default class Player {
    constructor(game) {
        this.game = game
        this.width = 42
        this.height = 100
        this.x = 50
        this.y = 100
        this.boundX = 1024

        this.frame = 0

        this.speedX = 0
        this.speedY = 0
        this.maxSpeed = 10
        this.jumpSpeed = 15

        this.grounded = false

        const img = new Image()
        img.src = playerS
        this.image = img
        this.maxFrame = 2
        this.timer = 0
        this.animationTime = 300

        this.faceLeft = false
    }

    update(deltaTime) {
        if (this.game.keys.includes('ArrowLeft') && this.x > 0) {
            this.speedX = -this.maxSpeed
            this.faceLeft = true
        } else if (this.game.keys.includes('ArrowRight') && this.x < 1024 - this.width) {
            this.speedX = this.maxSpeed
            this.faceLeft = false
        } else {
            this.speedX = 0
        }

        if (this.game.keys.includes('ArrowRight')) {
            console.log(this.x)
            console.log(this.game.width)
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

        // animations
        if (this.timer > this.animationTime){
            this.frame++
            this.timer = 0
            if (this.frame > this.maxFrame) this.frame = 0
        } else {
            this.timer += deltaTime
        }

        this.x += this.speedX
        this.y += this.speedY
    }

    draw(context) {


        context.drawImage(this.image, 40, 0, 42, this.image.height, this.x, this.y, this.width, this.height)
        //switch (this.frame) {
        //    case 0:
        //        context.drawImage(this.image, 80,173,112,137, this.x, this.y, this.width, this.height)
        //        break;
        //    case 1:
        //        context.drawImage(this.image, 203, 157, 130,170, this.x, this.y, this.width, this.height)
        //        break;
        //    case 2:
        //        context.drawImage(this.image, 363, 182, 100,140, this.x, this.y, this.width, this.height)
        //        break;
        //    default:
        //        context.fillStyle = '#f00'
        //        context.fillRect(this.x, this.y, this.width, this.height)
        //        break;
        //}
        

        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.fillStyle = 'black'
            context.font = '12px Arial'
            context.fillText(this.frame, this.x, this.y - 5)
        }
    }
}