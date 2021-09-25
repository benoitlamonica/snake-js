import { dictionaryKeyMethodGame, dictionaryKeyMethodSnake } from '../static/snakekeys'
export default class SnakeGame {

    constructor({ snake, fruit, specialfruit, canvas }) {
        this.gameLaunched = false
        this.score = 0
        this.gameover = false

        this.squareSnake = snake
        this.fruit = fruit
        this.canvas = canvas
        this.sFruit = specialfruit

        this.lastKeyCode = 38
        this.delayInterval = 100
        this.currentInterval = null
        this.frame = 0

        this.setInitialPosition()
        document.querySelector('.restart').addEventListener('click', this.restart)
    }

    setInitialPosition = () => {
        this.squareSnake.ctx.beginPath()
        this.squareSnake.ctx.fillStyle = 'rgb(92, 56, 83)'
        this.squareSnake.ctx.arc(this.x + (this.size / 2), this.y + (this.size / 2), this.size / 2, 0, 2 * Math.PI)
        this.squareSnake.ctx.stroke()
    }

    /**
     * Game Core
     */

    start = () => {
        this.gameLaunched = true
        this.fruit.create()
        this.setScore()
        window.addEventListener('keydown', this.handleGameListener)
    }

    pause = () => {
        if (this.gameLaunched) {
            this.gameLaunched = false
            this.setPauseDisplay(1)
            this.clearInterval()
        } else {
            this.gameLaunched = true
            this.setPauseDisplay(0)
            this.handleInterval(() => this.resumeLastDirection())
        }
    }

    end = () => {
        this.gameLaunched = false
        this.gameover = true
        window.removeEventListener('keydown', this.handleGameListener)
        this.clearInterval();
    }

    reset = () => {
        this.gameLaunched = false
        this.score = 0
        this.gameover = false

        this.squareSnake = this.squareSnake.reset()

        this.lastKeyCode = 38
        this.delayInterval = 100
        this.currentInterval = null
        this.frame = 0

        this.setInitialPosition()
    }

    restart = () => {
        this.squareSnake.ctx.clearRect(0, 0, 500, 520)
        this.setGameOverDisplay(0)
        this.canvas.style.opacity = 1
        this.reset()
        this.start()
    }

    /**
     * Mixins
     */

    setScore = () => {
        let spanScore = document.querySelector('.score');
        spanScore.textContent = this.score
    }

    clearInterval = () => {
        if (this.currentInterval) {
            clearInterval(this.currentInterval)
        }
    }

    resumeLastDirection = () => {
        this.squareSnake[dictionaryKeyMethodSnake[this.lastKeyCode]]()
    }

    setGameOverDisplay = (state) => {
        const gameOverBloc = document.querySelector('.gameover')
        gameOverBloc.style.display = state ? 'block' : 'none'
        setTimeout(() => {
            gameOverBloc.style.opacity = state ? 1 : 0
        }, 10)
    }

    setPauseDisplay = (state) => {
        const pauseBloc = document.querySelector('.paused')
        pauseBloc.style.display = state ? 'block' : 'none'
        setTimeout(() => {
            pauseBloc.style.opacity = state ? 1 : 0
        }, 10)
    }

    superpositionGate = (creation, condition) => {
        do { creation() } while (condition)
    }

    /**
     * Conditions
     */

    hasTouchedFruit = () => {
        return this.squareSnake.x === this.fruit.x && this.squareSnake.y === this.fruit.y
    }

    hasTouchedSpecialFruit = () => {
        return this.squareSnake.x === this.sFruit.x && this.squareSnake.y === this.sFruit.y
    }

    hasTouchedChildrens = (x, y) => {
        let touch = 0
        this.squareSnake.childrens.forEach(children => {
            if (children.x === x && children.y === y) {
                touch++
            }
        })
        return touch > 0
    }

    hasTouchedLimits = () => {
        return this.squareSnake.x === 500 || this.squareSnake.y === 500 || this.squareSnake.x === -this.squareSnake.size || this.squareSnake.y === -this.squareSnake.size
    }

    /**
     * Main Handlers
     */

    handleFruitCollision = () => {
        if (this.hasTouchedFruit()) {
            this.superpositionGate(this.fruit.create, this.hasTouchedChildrens(this.fruit.x, this.fruit.y))
            this.score++
            this.setScore()
            this.handleDifficulty()
            this.squareSnake.addChildren()
        }
    }

    handleSpecialFruitCollision = () => {
        if (this.hasTouchedSpecialFruit()) {
            if (this.sFruit.exist) {
                this.squareSnake.deleteHalfChildrens()
                this.fruit.draw()
                this.sFruit.exist = false
            }
        }
    }

    handleSpecialFruitCreation = () => {
        if (this.frame % 100 === 0 && this.frame !== 0) {
            this.superpositionGate(this.sFruit.create, this.hasTouchedChildrens(this.sFruit.x, this.sFruit.y))
        }
    }

    handleDifficulty = () => {
        if (this.score % 5 === 0) {
            this.delayInterval -= 1
        }
    }

    handleGameover = () => {
        if (this.hasTouchedChildrens(this.squareSnake.x, this.squareSnake.y) || this.hasTouchedLimits()) {
            this.end()
            this.setGameOverDisplay(1)
            this.canvas.style.opacity = 0.4
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
            this.handleSpecialFruitCollision()
            this.handleGameover()
            this.handleSpecialFruitCreation()
            this.squareSnake.updateCanvas()
            this.frame++
        }, this.delayInterval)
    }
}