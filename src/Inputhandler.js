export default class InputHandler {
    constructor(game) {
        this.game = game
        window.addEventListener('keydown', (event) => {
            console.log(event.key)
            if (
                (event.key === 'ArrowUp' ||
                    event.key === 'ArrowDown' ||
                    event.key === 'ArrowLeft' ||
                    event.key === 'ArrowRight') &&
                this.game.keys.indexOf(event.key) === -1
            ) {
                this.game.keys.push(event.key)
            }
            if (event.key === 'd') {
                this.game.debug = !this.game.debug
            }
            if (event.key === 'q') {
                this.game.gameOver = !this.game.gameOver
            }
            if (this.game.gameOver && event.key === 'Enter') {
                this.game.reStart()
            }
        })
        window.addEventListener('keyup', (event) => {
            if (this.game.keys.indexOf(event.key) > -1) {
                this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
            }
        })
    }
}