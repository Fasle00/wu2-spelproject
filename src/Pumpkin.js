import Enemy from "./Enemy";

export default class Pumpkin extends Enemy {
    constructor(game) {
        super(game)
        this.width = 50
        this.height = 40
        this.x = Math.random() * (this.game.width * 0.9 - this.width * 2) + this.width
        this.y = Math.random() * (this.game.height * 0.9 - this.height)
        this.speedX = (Math.random() <= 0.5)? -2 : 2
        this.markedForDeletion = false
        this.lives = 25
    }
}