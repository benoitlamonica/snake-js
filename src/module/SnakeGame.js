import { dictionaryKeyMethodGame, dictionaryKeyMethodSnake } from '../static/snakeKey'
export default class SnakeGame {

    constructor(square, fruit, canvas) {
        this.gameLaunched = false
        this.score = 0
        this.gameover = false

        this.squareSnake = square
        this.fruit = fruit
        this.canvas = canvas

        this.lastKeyCode = 38
        this.delayInterval = 100
        this.currentInterval = null

        this.setInitialPosition()
    }

    setInitialPosition = () => {
        this.squareSnake.ctx.beginPath()
        this.squareSnake.ctx.fillStyle = "black";
        this.squareSnake.ctx.fillRect(this.squareSnake.x, this.squareSnake.y, this.squareSnake.size, this.squareSnake.size);
        this.squareSnake.ctx.stroke()
    }

    start = () => {
        this.gameLaunched = true
        this.fruit.create()
        this.setScore()
        window.addEventListener('keydown', this.handleGameListener)
    }

    pause = () => {
        if (this.gameLaunched) {
            this.gameLaunched = false
            this.clearInterval()
        } else {
            this.gameLaunched = true
            this.handleInterval(() => this.resumeLastDirection())
        }
    }

    end = () => {
        this.gameLaunched = false
        this.gameover = true
        window.removeEventListener('keydown', this.handleGameListener)
        this.clearInterval();
    }

    setScore = () => {
        let spanScore = document.querySelector('.score');
        spanScore.textContent = this.score
    }

    handleFruitCollision = () => {
        if (this.squareSnake.x === this.fruit.x && this.squareSnake.y === this.fruit.y) {
            this.fruit.create()
            this.score++
            this.setScore()
            this.handleDifficulty()
            this.squareSnake.addChildren()
        }
    }

    handleDifficulty = () => {
        if (this.score % 5 === 0) {
            this.delayInterval -= 5
        }
    }

    handleGameover = () => {
        if (this.squareSnake.x === 500 || this.squareSnake.y === 500 || this.squareSnake.x === -this.squareSnake.size || this.squareSnake.y === -this.squareSnake.size) {
            this.end()
            this.canvas.classList.add('gameover');
        }
    }

    handleGameListener = (e) => {
        if (this.gameLaunched) {
            if (this.squareSnake[dictionaryKeyMethodSnake[e.which]]) {
                this.handleInterval(() => this.squareSnake[dictionaryKeyMethodSnake[e.which]]())
                this.lastKeyCode = e.which
                return
            }
        }

        if (this[dictionaryKeyMethodGame[e.which]]) {
            this[dictionaryKeyMethodGame[e.which]]()
            return
        }
    }

    handleInterval = (callback) => {
        this.clearInterval()
        this.currentInterval = setInterval(() => {
            callback()
            this.handleFruitCollision()
            this.squareSnake.updateCanvas()
            this.handleGameover()
        }, this.delayInterval)
    }

    clearInterval = () => {
        if (this.currentInterval) {
            clearInterval(this.currentInterval)
        }
    }

    resumeLastDirection = () => {
        this.squareSnake[dictionaryKeyMethodSnake[this.lastKeyCode]]()
    }

}