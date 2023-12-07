export default class Layer {
    constructor(game, image, y) {
        this.game = game;
        const IMG = new Image();
        IMG.src = image
        this.image = IMG;
        this.y = y;
    }

    draw(context) {
        context.drawImage(this.image, 0, this.y)
    }
}