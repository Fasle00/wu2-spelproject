import Enemy from "./Enemy";

export default class Pumpkin extends Enemy {
    constructor(game) {
        super(game)
        this.width = 50
        this.height = 80
        this.x = game.width
        this.y = Math.random() * (this.game.height * 0.9 - this.height)
        this.speedX = 3
        this.markedForDeletion = false
        this.lives = 25
    }
}